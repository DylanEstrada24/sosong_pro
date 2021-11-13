import axios from 'axios';
import { store } from '../redux/store';
import NavigationService from '../Navigation/NavigationService';
import { StackActions, NavigationActions } from 'react-navigation';
import SimpleToast from 'react-native-simple-toast';


//api connector flow
// success flow
// commonApi -> return result

// token error flow
// commonApi -> errorClassifier -> resultDataChecker -> authApi -> commonApi -> return result (successData)

// common error flow
// commonApi -> errorClassifier -> resultDataChecker -> return result (errorData)

// host 주소
const host = 'https://sspro.rhodolite.org/api/v1/';

// 통상 api 커넥터 : 굿츠 내부 api 요청시 사용한다.
// 입력값 :   type : 요청 타입
//          url : 요청 url
//          params : 요청 파라미터
// 결과값 : 응답 객체
export async function commonApi(type, url, params) {

    var resultData;

    commonConnector = axios.create({
        baseURL: host,
        timeout: 10000,
        method: type,
        headers: {
            Authorization: 'Bearer ' + store.getState().user.goodchAccessToken,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
        },
    });

    if (type == 'get' || type == 'GET') {
        // get 호출
        await commonConnector
            .get(url, {
                params: {
                    ...params,
                },
            })
            .then((response) => {
                resultData = response.data;
            })
            .catch((error) => {
                console.log('common')
                resultData = errorClassifier(error.response)
            });
    } else if (type == 'post' || type == 'POST') {
        // post 호출
        await commonConnector
            .post(url, {
                ...params,
            })
            .then((response) => {
                resultData = response.data;
            })
            .catch((error) => {
                console.log(error)
                resultData = errorClassifier(error.response)
            });
    } else if (type == 'put' || type == 'PUT') {
        // put 호출
        await commonConnector
            .put(url, {
                ...params,
            })
            .then((response) => {
                resultData = response.data;
            })
            .catch((error) => {
                resultData = errorClassifier(error.response)
            });
    } else if (type == 'delete' || type == 'DELETE') {
        // delete 호출
        await commonConnector
            .delete(url, {
                params: {
                    ...params,
                },
            })
            .then((response) => {
                resultData = response.data;
            })
            .catch((error) => {
                resultData = errorClassifier(error.response)
            });
    }


    return resultDataChecker(resultData, type, url, params);
}

// 에러 분류기 : 에러 발생시 해당 에러를 파싱하여 string결과값으로 분류한다.
// 입력값 :   error.response
// 결과값 : 해당 에러 안내문구
function errorClassifier(error) {
    var errorResult = '';

    console.log('check api error for debuging : ', error)

    switch (error.status) {
        case 400:
            // 잘못된 요청
            errorResult = error.data.error;
            break;
        case 401:
            // 잘못된 인증, 토큰만료,
            errorResult = 'expired token';
            break;
        case 402:
            // 미승인 요청
            errorResult = error.data.error;
            break;
        case 403:
            // 요청 거부
            errorResult = error.data.error;
            break;
        case 404:
            // 잘못된 요청 (컨텐츠 없음)
            errorResult = error.data.error;
            break;
        case 408:
            // 응답시간 초과 (10sec)
            errorResult = error.data.error;
            break;
        case 500:
            // 서버오류 발생
            errorResult = error.data.error;
            break;
        case 501:
            // 서버 내 기능 미구현
            errorResult = error.data.error;
            break;
        case 502:
            // 서버 내 잘못된 응답
            errorResult = error.data.error;
            break;
        default:
            errorResult = error.status;
            break;
    }

    return errorResult;


}

// 결과값 체커 : 통신결과값들 중 에러가 발생했을때 체크함.
// 입력값 :   resultData : 통신결과값
// 결과값 : 응답 객체
async function resultDataChecker(resultData, type, url, params) {

    // 만약 호출이 401에러가 발생하면 토큰 갱신 후 해당 요청을 재귀시킴.
    // if (resultData == 'expired token') {
    if (resultData.msg == 'token is expired') {

        // 무한재귀를 막는 스위치
        var isFinishRecursive = false;
        //굿츠토큰 재발행 요청
        var authResult = await authApi();

        //굿츠토큰 재발행 실패시 (카카오토큰이 만료된 경우)
        if (authResult == 'need update Token') {
            //카카오 토큰을 사용
            authParams = {
                authPlatform: 'kakao',
                kakaoAccessToken: store.getState().user.kakaoAccessToken,
                fcmToken: store.getState().user.fcmToken,
            };

            //카카오 토큰으로 굿츠토큰 재발행
            await sosongProLoginGoods('post', 'auth/signin', authParams)
                .then((result) => {

                    //통신에 성공하여 200 status를 받았지만, api서버의 결과가 false일 경우 토큰만료로 판정함.
                    //카카오 토큰 만료시 로그인 화면으로 이동
                    if (result.code == '-401') {
                        isFinishRecursive = false;
                        SimpleToast.show('토큰만료. 로그인화면으로 이동합니다.', SimpleToast.SHORT);
                        NavigationService.navigate('LoginScreen');
                    }

                    //재발행이 된 경우
                    if (result.data.data.accessToken !== undefined) {
                        store.getState().user.goodchAccessToken = result.data.data.accessToken;
                        store.getState().user.goodchRefreshToken = result.data.data.refreshToken;
                        isFinishRecursive = true;
                    }
                })
                .catch((error) => {
                    //토큰 갱신 실패시 (ex.리프레시 토큰의 만료 등) 로그인 화면으로 강제 이동
                    SimpleToast.show('토큰갱신실패 로그인화면으로 이동합니다.', SimpleToast.SHORT);
                    NavigationService.navigate('LoginScreen');
                });
        }

        if (authResult == 'token update success') {
            isFinishRecursive = true
            resultData = 'ok'
        }

        //재발행 성공했을 경우
        if (isFinishRecursive == true) {

            //토큰 재발행이 끝나면 재귀시킴.
            await commonApi(type, url, params)
                .then((apiResult) => {
                    resultData = apiResult
                })
        }
    }

    //디비 수정등으로 인해 유저 정보가 없는경우 로그인스크린으로 이동시켜서 재가입 시킴
    if (resultData == 'user idx not found') {
        resultData = 'removed user try signUp again';
        NavigationService.navigate('LoginScreen');
    }

    //로그아웃한 유저의 리퀘스트인 경우 로그인 스크린으로 이동시켜 로그인 시킴
    if (resultData == 'logout user request') {
        resultData = 'removed user try signUp again';
        NavigationService.navigate('LoginScreen');
    }

    //셀러등록 요청이 중복되는 경우이지만 앱에서는 셀러등록 api를 사용하지 않음
    if (resultData == 'duplicate seller signup request') {
        resultData = 'can not handle this api at application. go to webpage';
    }

    //정상 데이터가 아니거나 알수없는 에러코드일 경우 로그인 화면으로 이동시킴.
    if (resultData === undefined || resultData == 'undefined error') {
        resultData = 'wrong token';
        // NavigationService.navigate('LoginScreen');
    }

    return resultData
}

//인증 api 커넥터 : 401에러 발생시 굿츠토큰을 재발급 한다.
//결과값 : 토큰발행 결과 정보 문자열
async function authApi() {

    var restResult;

    commonConnector = axios.create({
        baseURL: host,
        timeout: 10000,
        method: 'get',
        headers: {
            Authorization: 'Bearer ' + store.getState().user.goodchRefreshToken,
        },
    });

    //굿츠 리프레시 토큰으로 굿츠 엑세스 토큰을 받는다.
    await commonConnector
        .get('auth/user/accessToken')
        .then((response) => {

            //통신에 성공하여 200 status를 받았지만, api서버의 결과가 false일 경우 토큰만료로 판정함.
            //그러므로 api서버의 결과가 true일 경우에만 토큰 재발급. 아닐 경우 재로그인 필요.
            if (response.data.success == true) {
                //결과(굿츠api token)을 store.user에 할당
                store.getState().user.goodchAccessToken = response.data.data.accessToken;

                //store에 저장한다.
                store.dispatch({
                    type: 'SET_USER',
                    payload: store.getState().user,
                });

                //성공했음을 리턴
                restResult = 'token update success'
            } else {
                //카카오 토큰의 재발행이 필요함을 리턴
                restResult = 'need update Token'
            }
        })
        .catch((error) => {
            console.log(error)
            //토큰 갱신 실패시 (ex.리프레시 토큰의 만료 등) 로그인 화면으로 강제 이동
            SimpleToast.show('토큰갱신실패 로그인화면으로 이동합니다.', SimpleToast.SHORT);
            NavigationService.navigate('LoginScreen');
        });

    return restResult;
}

// 외부 api 커넥터 : 택배조회 등 외부 서비스에 요청시 사용한다.
// 입력값 :   type : 요청 타입
//          baseUrl : 요청 url 도메인
//          url : 요청 url
//          params : 요청 파라미터
// 결과값 : 응답 객체
export async function externalApi(type, baseUrl, url, params) {

    var resultData;

    commonConnector = axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        method: type,
    });

    if (type == 'get' || type == 'GET') {
        // get 호출
        await commonConnector
            .get(url, {
                params: params
            })
            .then((response) => {
                resultData = response;
            })
            .catch((error) => {
                resultData = errorClassifier(error.response)
            });
    } else if (type == 'post' || type == 'POST') {
        // post 호출
        await commonConnector
            .post(url,
                params
            )
            .then((response) => {
                resultData = response.data;
            })
            .catch((error) => {
                resultData = errorClassifier(error.response)
            });
    }

    return resultData;
}

// 소송프로 로그인 api 커넥터
// 입력값 :   type : 요청 타입
//          url : 요청 url
//          params : 요청 파라미터
// 결과값 : 응답 객체
export async function sosongProLoginGoods(type, url, params) {

    var resultData;

    if(params.authPlatform == 'apple') {
        commonConnector = axios.create({
            baseURL: host,
            timeout: 10000,
            method: type,
        });
    } else {
        commonConnector = axios.create({
            baseURL: host,
            timeout: 10000,
            method: type,
            headers: {
                Authorization: 'Bearer ' + params.accessToken,
            },
        });
    }

    

    await commonConnector
        .post(url,
            params
        )
        .then((response) => {
            resultData = response.data;
        })
        .catch((error) => {
            resultData = errorClassifier(error.response)
        });

    return resultData;
}


// 진우씨가 쓰세요
export async function fileUploadApi(type, url, formData) {

    var resultData;

    commonConnector = axios.create({
        baseURL: host,
        timeout: 10000,
        method: type,
        headers: {
            Authorization: 'Bearer ' + store.getState().user.goodchAccessToken,
        },
    });

    if (type == 'post' || type == 'POST') {
        await commonConnector
            .post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                resultData = response.data;
            })
            .catch((error) => {
                resultData = errorClassifier(error.response)
            });
    } else if (type == 'put' || type == 'PUT') {
        await commonConnector
            .put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                resultData = response.data;
            })
            .catch((error) => {
                resultData = errorClassifier(error.response)
            });
    }

    return resultDataChecker(resultData, type, url, formData);
}
