import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	BackHandler
} from 'react-native';

// import BlueDot from '../../Components/BlueDot';
import SettingItem from '../Setting/SettingItem';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import { store } from '../../redux/store';
import { connect } from 'react-redux';
import { setCase, clearCase } from '../../redux/actions/cases';
import { commonApi, fileUploadApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker'
import NavigationService from '../../Navigation/NavigationService';
import { ActivityIndicator } from 'react-native-paper';

var cnt = 0

class CaseAdd extends Component {

	constructor(props) {
        super(props)
        this.state = {
            checkbox1: false,
			checkbox2: false,
			imgPathList: '',
			title: '',
			court: '선택하세요',
			year: '선택하세요',
			caseNumber: '',
			name: '',
			division: '',
			mark: '선택하세요',
			isVisible: false,
			clicked: false,
			courtFullname: [
				{
					short: '대법원',
					full: '대법원',
				},
				{
					short: '서울고등법원',
					full: '서울고등법원',
				},
				{
					short: '서울고법(춘천)',
					full: '서울고등법원(춘천재판부)',
				},
				{
					short: '서울고법(인천)',
					full: '서울고등법원(인천재판부)',
				},
				{
					short: '대전고등법원',
					full: '대전고등법원',
				},
				{
					short: '대전고법(청주)',
					full: '대전고등법원(청주재판부)',
				},
				{
					short: '대구고등법원',
					full: '대구고등법원',
				},
				{
					short: '부산고등법원',
					full: '부산고등법원',
				},
				{
					short: '부산고법(창원)',
					full: '부산고등법원(창원재판부)',
				},
				{
					short: '부산고법(울산)',
					full: '부산고등법원(울산재판부)',
				},
				{
					short: '광주고등법원',
					full: '광주고등법원',
				},
				{
					short: '광주고법(제주)',
					full: '광주고등법원(제주재판부)',
				},
				{
					short: '광주고법(전주)',
					full: '광주고등법원(전주재판부)',
				},
				{
					short: '수원고등법원',
					full: '수원고등법원',
				},
				{
					short: '특허법원',
					full: '특허법원',
				}, // 1
				{
					short: '서울중앙지법',
					full: '서울중앙지방법원',
				},
				{
					short: '서울동부지법',
					full: '서울동부지방법원',
				},
				{
					short: '서울남부지법',
					full: '서울남부지방법원',
				},
				{
					short: '서울북부지법',
					full: '서울북부지방법원',
				},
				{
					short: '서울서부지법',
					full: '서울서부지방법원',
				},
				{
					short: '서울가정법원',
					full: '서울가정법원',
				},
				{
					short: '서울행정법원',
					full: '서울행정법원',
				},
				{
					short: '서울회생법원',
					full: '서울회생법원',
				},
				{
					short: '의정부지법',
					full: '의정부지방법원',
				},
				{
					short: '고양지원',
					full: '고양지원',
				},
				{
					short: '인천지법',
					full: '인천지방법원',
				},
				{
					short: '부천지원',
					full: '인천지방법원 부천지원',
				},
				{
					short: '인천가정법원',
					full: '인천가정법원',
				},
				{
					short: '부천지원(가정)',
					full: '인천가정법원 부천지원',
				},
				{
					short: '수원지방법원',
					full: '수원지방법원',
				},
				{
					short: '성남지원',
					full: '성남지원',
				},
				{
					short: '여주지원',
					full: '여주지원',
				},
				{
					short: '평택지원',
					full: '평택지원',
				},
				{
					short: '안산지원',
					full: '안산지원',
				},
				{
					short: '안양지원',
					full: '안양지원',
				},
				{
					short: '수원가정법원',
					full: '수원가정법원',
				},
				{
					short: '성남지원(가정)',
					full: '수원가정법원 성남지원',
				},
				{
					short: '여주지원(가정)',
					full: '수원가정법원 여주지원',
				},
				{
					short: '평택지원(가정)',
					full: '수원가정법원 평택지원',
				},
				{
					short: '안산지원(가정)',
					full: '수원가정법원 안산지원',
				},
				{
					short: '안양지원(가정)',
					full: '수원가정법원 안양지원',
				},
				{
					short: '포천시법원',
					full: '포천시법원',
				},
				{
					short: '가평군법원',
					full: '가평군법원',
				},
				{
					short: '남양주시법원',
					full: '남양주시법원',
				},
				{
					short: '연천군법원',
					full: '연천군법원',
				},
				{
					short: '동두천시법원',
					full: '동두천시법원',
				},
				{
					short: '파주시법원',
					full: '파주시법원',
				},
				{
					short: '강화군법원',
					full: '강화군법원',
				},
				{
					short: '김포시법원',
					full: '김포시법원',
				},
				{
					short: '오산시법원',
					full: '오산시법원',
				},
				{
					short: '용인시법원',
					full: '용인시법원',
				},
				{
					short: '광주시법원',
					full: '성남지원 광주시법원',
				},
				{
					short: '양평군법원',
					full: '여주지원 양평군법원',
				},
				{
					short: '이천시법원',
					full: '여주지원 이천시법원',
				},
				{
					short: '안성시법원',
					full: '평택지원 안성시법원',
				},
				{
					short: '광명시법원',
					full: '안산지원 광명시법원',
				},
				{
					short: '춘천지방법원',
					full: '춘천지방법원',
				},
				{
					short: '강릉지원',
					full: '강릉지원',
				},
				{
					short: '원주지원',
					full: '원주지원',
				},
				{
					short: '속초지원',
					full: '속초지원',
				},
				{
					short: '영월지원',
					full: '영월지원',
				},
				{
					short: '철원군법원',
					full: '철원군법원',
				},
				{
					short: '인제군법원',
					full: '인제군법원',
				},
				{
					short: '홍천군법원',
					full: '홍천군법원',
				},
				{
					short: '양구군법원',
					full: '양구군법원',
				},
				{
					short: '화천군법원',
					full: '화천군법원',
				},
				{
					short: '삼척시법원',
					full: '강릉지원 삼척시법원',
				},
				{
					short: '동해시법원',
					full: '강릉지원 동해시법원',
				},
				{
					short: '횡성군법원',
					full: '원주지원 횡성군법원',
				},
				{
					short: '고성군법원',
					full: '속초지원 고성군법원',
				},
				{
					short: '양양군법원',
					full: '속초지원 양양군법원',
				},
				{
					short: '정선군법원',
					full: '영월지원 정선군법원',
				},
				{
					short: '태백시법원',
					full: '영월지원 태백시법원',
				},
				{
					short: '평창군법원',
					full: '영월지원 평창군법원',
				},
				{
					short: '청주지방법원',
					full: '청주지방법원',
				},
				{
					short: '충주지원',
					full: '충주지원',
				},
				{
					short: '제천지원',
					full: '제천지원',
				},
				{
					short: '영동지원',
					full: '영동지원',
				},
				{
					short: '보은군법원',
					full: '보은군법원',
				},
				{
					short: '괴산군법원',
					full: '괴산군법원',
				},
				{
					short: '진천군법원',
					full: '진천군법원',
				},
				{
					short: '음성군법원',
					full: '음성군법원',
				},
				{
					short: '단양군법원',
					full: '단양군법원',
				},
				{
					short: '옥천군법원',
					full: '옥천군법원',
				},
				{
					short: '대전지방법원',
					full: '대전지방법원',
				},
				{
					short: '홍성지원',
					full: '대전지방법원 홍성지원',
				},
				{
					short: '공주지원',
					full: '대전지방법원 공주지원',
				},
				{
					short: '논산지원',
					full: '대전지방법원 논산지원',
				},
				{
					short: '서산지원',
					full: '대전지방법원 서산지원',
				},
				{
					short: '천안지원',
					full: '대전지방법원 천안지원',
				},
				{
					short: '대전가정법원',
					full: '대전가정법원',
				},
				{
					short: '홍성지원(가정)',
					full: '대전가정법원 홍성지원',
				},
				{
					short: '공주지원(가정)',
					full: '대전가정법원 공주지원',
				},
				{
					short: '논산지원(가정)',
					full: '대전가정법원 논산지원',
				},
				{
					short: '서산지원(가정)',
					full: '대전가정법원 서산지원',
				},
				{
					short: '천안지원(가정)',
					full: '대전가정법원 천안지원',
				},
				{
					short: '세종시법원',
					full: '세종특별자치시법원',
				},
				{
					short: '금산군법원',
					full: '금산군법원',
				},
				{
					short: '서천군법원',
					full: '서천군법원',
				},
				{
					short: '보령시법원',
					full: '보령시법원',
				},
				{
					short: '예산군법원',
					full: '예산군법원',
				},
				{
					short: '청양군법원',
					full: '청양군법원',
				},
				{
					short: '부여군법원',
					full: '부여군법원',
				},
				{
					short: '태안군법원',
					full: '태안군법원',
				},
				{
					short: '당진시법원',
					full: '당진시법원',
				},
				{
					short: '아산시법원',
					full: '아산시법원',
				},
				{
					short: '대구지방법원',
					full: '대구지방법원',
				},
				{
					short: '대구서부지원',
					full: '대구지방법원 서부지원',
				},
				{
					short: '안동지원',
					full: '대구지방법원 안동지원',
				},
				{
					short: '경주지원',
					full: '대구지방법원 경주지원',
				},
				{
					short: '포항지원',
					full: '대구지방법원 포항지원',
				},
				{
					short: '김천지원',
					full: '대구지방법원 김천지원',
				},
				{
					short: '상주지원',
					full: '대구지방법원 상주지원',
				},
				{
					short: '의성지원',
					full: '대구지방법원 의성지원',
				},
				{
					short: '영덕지원',
					full: '대구지방법원 영덕지원',
				},
				{
					short: '대구가정법원',
					full: '대구가정법원',
				},
				{
					short: '안동지원(가정)',
					full: '대구가정법원 안동지원',
				},
				{
					short: '경주지원(가정)',
					full: '대구가정법원 경주지원',
				},
				{
					short: '포항지원(가정)',
					full: '대구가정법원 포항지원',
				},
				{
					short: '김천지원(가정)',
					full: '대구가정법원 김천지원',
				},
				{
					short: '상주지원(가정)',
					full: '대구가정법원 상주지원',
				},
				{
					short: '의성지원(가정)',
					full: '대구가정법원 의성지원',
				},
				{
					short: '영덕지원(가정)',
					full: '대구가정법원 영덕지원',
				},
				{
					short: '청도군법원',
					full: '청도군법원',
				},
				{
					short: '영천시법원',
					full: '영천시법원',
				},
				{
					short: '칠곡군법원',
					full: '칠곡군법원',
				},
				{
					short: '경산시법원',
					full: '경산시법원',
				},
				{
					short: '성주군법원',
					full: '성주군법원',
				},
				{
					short: '고령군법원',
					full: '고령군법원',
				},
				{
					short: '영주시법원',
					full: '영주시법원',
				},
				{
					short: '봉화군법원',
					full: '봉화군법원',
				},
				{
					short: '구미시법원',
					full: '구미시법원',
				},
				{
					short: '문경시법원',
					full: '문경시법원',
				},
				{
					short: '예천군법원',
					full: '예천군법원',
				},
				{
					short: '군위군법원',
					full: '군위군법원',
				},
				{
					short: '청송군법원',
					full: '청송군법원',
				},
				{
					short: '영양군법원',
					full: '영양군법원',
				},
				{
					short: '울진군법원',
					full: '울진군법원',
				},
				{
					short: '부산지방법원',
					full: '부산지방법원',
				},
				{
					short: '부산동부지원',
					full: '부산지방법원 동부지원',
				},
				{
					short: '부산서부지원',
					full: '부산지방법원 서부지원',
				},
				{
					short: '부산가정법원',
					full: '부산가정법원',
				},
				{
					short: '울산지방법원',
					full: '울산지방법원',
				},
				{
					short: '울산가정법원',
					full: '울산가정법원',
				},
				{
					short: '창원지방법원',
					full: '창원지방법원',
				},
				{
					short: '마산지원',
					full: '마산지원',
				},
				{
					short: '진주지원',
					full: '진주지원',
				},
				{
					short: '통영지원',
					full: '통영지원',
				},
				{
					short: '밀양지원',
					full: '밀양지원',
				},
				{
					short: '거창지원',
					full: '거창지원',
				},
				{
					short: '양산시법원',
					full: '양산시법원',
				},
				{
					short: '창원남부시법원',
					full: '창원남부시법원',
				},
				{
					short: '김해시법원',
					full: '김해시법원',
				},
				{
					short: '함안군법원',
					full: '함안군법원',
				},
				{
					short: '의령군법원',
					full: '의령군법원',
				},
				{
					short: '하동군법원',
					full: '하동군법원',
				},
				{
					short: '사천시법원',
					full: '사천시법원',
				},
				{
					short: '남해군법원',
					full: '남해군법원',
				},
				{
					short: '산청군법원',
					full: '산청군법원',
				},
				{
					short: '거제시법원',
					full: '거제시법원',
				},
				{
					short: '고성군법원',
					full: '고성군법원(경)',
				},
				{
					short: '창녕군법원',
					full: '창녕군법원',
				},
				{
					short: '합천군법원',
					full: '합천군법원',
				},
				{
					short: '함양군법원',
					full: '함양군법원',
				},
				{
					short: '광주지방법원',
					full: '광주지방법원',
				},
				{
					short: '목포지원',
					full: '광주지방법원 목포지원',
				},
				{
					short: '장흥지원',
					full: '광주지방법원 장흥지원',
				},
				{
					short: '순천지원',
					full: '광주지방법원 순천지원',
				},
				{
					short: '해남지원',
					full: '광주지방법원 해남지원',
				},
				{
					short: '광주가정법원',
					full: '광주가정법원',
				},
				{
					short: '목포지원(가정)',
					full: '광주가정법원 목포지원',
				},
				{
					short: '장흥지원(가정)',
					full: '광주가정법원 장흥지원',
				},
				{
					short: '순천지원(가정)',
					full: '광주가정법원 순천지원',
				},
				{
					short: '해남지원(가정)',
					full: '광주가정법원 해남지원',
				},
				{
					short: '담양군법원',
					full: '담양군법원',
				},
				{
					short: '곡성군법원',
					full: '곡성군법원',
				},
				{
					short: '화순군법원',
					full: '화순군법원',
				},
				{
					short: '나주시법원',
					full: '나주시법원',
				},
				{
					short: '영광군법원',
					full: '영광군법원',
				},
				{
					short: '장성군법원',
					full: '장성군법원',
				},
				{
					short: '함평군법원',
					full: '함평군법원',
				},
				{
					short: '영암군법원',
					full: '영암군법원',
				},
				{
					short: '무안군법원',
					full: '무안군법원',
				},
				{
					short: '강진군법원',
					full: '강진군법원',
				},
				{
					short: '고흥군법원',
					full: '고흥군법원',
				},
				{
					short: '광양시법원',
					full: '광양시법원',
				},
				{
					short: '구례군법원',
					full: '구례군법원',
				},
				{
					short: '보성군법원',
					full: '보성군법원',
				},
				{
					short: '여수시법원',
					full: '여수시법원',
				},
				{
					short: '완도군법원',
					full: '완도군법원',
				},
				{
					short: '진도군법원',
					full: '진도군법원',
				},
				{
					short: '전주지방법원',
					full: '전주지방법원',
				},
				{
					short: '군산지원',
					full: '군산지원',
				},
				{
					short: '정읍지원',
					full: '정읍지원',
				},
				{
					short: '남원지원',
					full: '남원지원',
				},
				{
					short: '김제시법원',
					full: '김제시법원',
				},
				{
					short: '진안군법원',
					full: '진안군법원',
				},
				{
					short: '무주군법원',
					full: '무주군법원',
				},
				{
					short: '임실군법원',
					full: '임실군법원',
				},
				{
					short: '익산시법원',
					full: '익산시법원',
				},
				{
					short: '고창군법원',
					full: '고창군법원',
				},
				{
					short: '부안군법원',
					full: '부안군법원',
				},
				{
					short: '장수군법원',
					full: '장수군법원',
				},
				{
					short: '순창군법원',
					full: '순창군법원',
				},
				{
					short: '제주지방법원',
					full: '제주지방법원',
				},
				{
					short: '서귀포시법원',
					full: '서귀포시법원',
				},
				// {
				// 	short: '법원행정처',
				// 	full: '법원행정처',
				// },
			]
		}
		this.toggleCheckBox1 = this.toggleCheckBox1.bind(this)
		this.toggleCheckBox2 = this.toggleCheckBox2.bind(this)
		this.excelHandler = this.excelHandler.bind(this)
		// this.courtCallback = this.courtCallback.bind(this)
		this.titleHandle = this.titleHandle.bind(this)
		this.divisionHandle = this.divisionHandle.bind(this)
		this.caseNumberHandle = this.caseNumberHandle.bind(this)
		this.nameHandle = this.nameHandle.bind(this)
		// this.toNavigate = this.toNavigate.bind(this)
		this.addHandler = this.addHandler.bind(this)
    }

	componentDidMount() {
		cnt = 0
		BackHandler.addEventListener('hardwareBackPress', this.handleClose)
		this.props.navigation.addListener("didFocus", () => {
			this.setState({
				court: store.getState().cases.court,
				year: store.getState().cases.year,
				mark: store.getState().cases.mark,
			})
		})
	}

    toggleCheckBox1(newValue) {
        this.setState({checkbox1: newValue});
    }
    toggleCheckBox2(newValue) {
        this.setState({checkbox2: newValue});
    }

	titleHandle(value) {
		this.setState({title: value})
	}

	divisionHandle(value) {
		this.setState({division: value})
	}

	caseNumberHandle(value) {
		this.setState({caseNumber: value})
	}

	nameHandle(value) {
		this.setState({name: value})
	}

	toggleModal = () => {
		this.setState({
			isVisible: !this.state.isVisible
		})
	}

	checkUser = () => {
		// 상용할때 체크해야함 ... JY
		if(store.getState().user.userType === 'common') {
			this.props.navigation.navigate('Jeonja')
		} else {
			this.toggleModal()
		}
	}

	async excelHandler() {
		try {
			const res = await DocumentPicker.pick({
				type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
			})
			const formData = new FormData();
			formData.append("excelFile", {
				name: res[0].name,
				uri: res[0].uri,
				type: 'application/vnd.ms-excel',
			});
			const formResult = fileUploadApi('post', 'file/excel/upload', formData, {
			}).then((res) => {
				console.log('formResult : ', res)
				this.props.navigation.pop()
			}).catch((e) => console.log(e,'err'))
		} catch (err) {
			console.log('err', err)
			// if (DocumentPicker.isCancel(err)) {
			//   // User cancelled the picker, exit any dialogs or menus and move on
			// } else {
			//   throw err
			// }
		}
	}

	toggleClicked = (value) => this.setState({clicked: value})

	async addHandler() {


		if(!this.state.checkbox1) {
			SimpleToast.show('사건정보 조회 및 저장권한 위임에 동의해주세요', SimpleToast.BOTTOM)
			return
		}

		if(!this.state.checkbox2) {
			SimpleToast.show('사건의 이해관계인 임을 확인해주세요', SimpleToast.BOTTOM)
			return
		}

		if(this.state.court === '선택하세요') {
			SimpleToast.show('법원을 선택해주세요', SimpleToast.BOTTOM)
			return
		}

		if(this.state.year === '선택하세요') {
			SimpleToast.show('사건년도를 선택해주세요', SimpleToast.BOTTOM)
			return
		}

		if(this.state.mark.trim() === '선택하세요') {
			SimpleToast.show('사건구분을 선택해주세요', SimpleToast.BOTTOM)
			return
		}

		if(this.state.caseNumber.trim() === '') {
			SimpleToast.show('일련번호를 입력해주세요', SimpleToast.BOTTOM)
			return
		}

		if(this.state.name.trim() === '') {
			SimpleToast.show('당사자 이름을 입력해주세요', SimpleToast.BOTTOM)
			return
		}

		if(this.state.name.trim().length < 2) {
			SimpleToast.show('당사자 이름을 2자이상 입력해주세요', SimpleToast.BOTTOM)
			return
		}

		const caseNumber = `${this.state.year}${this.state.mark}${this.state.caseNumber}`
		const webToken = store.getState().user.webToken

		const court = this.state.courtFullname.filter((value) => {
			if(value.short === this.state.court) {
				return true
			}
		})

		const data = {
			title: '',
			court: court[0].full,
			caseNumber: caseNumber,
			name: this.state.name,
			webToken: webToken
		}

		console.log('1023', data)

		if(cnt <= 0) {
			cnt++
			this.toggleClicked(true)
	
			await commonApi('POST', 'user/case', data).then((result) => {

				if(result.success) {
	
					SimpleToast.show("사건이 추가되었습니다.", SimpleToast.BOTTOM);
					this.toggleClicked(false)
					this.props.clearCase()
					NavigationService.navigate('TabNavigator')
	
				} else {
					SimpleToast.show(result.msg, SimpleToast.BOTTOM)
					cnt = 0
					this.toggleClicked(false)
				}
	
			// }).catch((err) => console.log("user/case ::: ", err))
			}).catch((err) => {
				SimpleToast.show(err.msg, SimpleToast.BOTTOM)
				cnt = 0
				this.toggleClicked(false)
			})

		} else {

			SimpleToast.show('비정상적인 접근입니다.', SimpleToast.BOTTOM)

		}


	}

	handleClose = () => {
		this.props.clearCase()
		NavigationService.navigate('TabNavigator')
	}


	render() {
		return (
			<>
				{
                    this.state.clicked ? (
                        <View 
                            style={{
                                position: 'absolute', 
                                flex: 1,
                                top: Dimensions.get('window').height / 2, 
                                right: 0, 
                                left: 0,
								zIndex: 9999
                            }}
                        >
                            <ActivityIndicator color="#0078D4" size={75} />
                        </View>
                    ) : null
                }
                <View style={{
                    flex: 1,
                    opacity: this.state.clicked ? 0.4 : null
                }}>

					<View style={styles.container}>
						<View style={styles.Top}>
							<View style={styles.header}>
								<View style={styles.title}>
									<Text style={styles.titleText}>사건 등록</Text>
								</View>
								<TouchableOpacity style={styles.exit} onPress={() => this.handleClose()} >
									<Image source={require('../../assets/images/X.png')} />
								</TouchableOpacity>
							</View>
						</View>
						
						<ScrollView style={styles.contentContainer}>
							{/* <View style={styles.excelContent}>
								<TouchableOpacity style={styles.nextButton} onPress={() => this.excelHandler()}>
									<Text style={styles.nextButtonText}>나의 사건 엑셀파일 업로드</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.horizonLine}>
								<View style={styles.horizon}></View>
								<View style={styles.horizonText}>
									<Text style={styles.lightGray}>혹은</Text>
								</View>
								<View style={styles.horizon}></View>
							</View> */}
							<View style={styles.itemListContainer}>
								{/* <View style={styles.itemContainer2}>
									<View style={styles.titleContainer}>
										<Text style={styles.contentTitle}>사건별칭</Text>
									</View>
									<View style={styles.contentInput}>
										<TextInput 
											style={styles.content} 
											placeholder="사건별칭을 입력하세요." 
											value={this.state.title}
											onChangeText={(value) => this.titleHandle(value)}
											placeholderTextColor="#808080"
										/>
									</View>
									<View></View>
								</View> */}
								<TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate("CourtSelect")} >
									<SettingItem title="법원" content={this.state.court} isMore />
								</TouchableOpacity>
								<TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate('YearSelect')} >
									<SettingItem title="사건년도" content={this.state.year} isMore />
								</TouchableOpacity>
								<TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate('MarkSelect')} >
									<SettingItem title="사건구분" content={this.state.mark} isMore />
								</TouchableOpacity>
								<View style={styles.itemContainer2}>
									<View style={styles.titleContainer}>
										<Text style={styles.contentTitle}>일련번호</Text>
									</View>
									<View style={styles.contentInput}>
										<TextInput 
											style={styles.content} 
											placeholder="일련번호를 입력하세요." 
											placeholderTextColor="#808080"
											value={this.state.caseNumber}
											onChangeText={(value) => this.caseNumberHandle(value)}
										/>
									</View>
									<View></View>
								</View>
								<View style={styles.itemContainer2}>
									<View style={styles.titleContainer}>
										<Text style={styles.contentTitle}>당사자</Text>
									</View>
									<View style={styles.contentInput}>
										<TextInput 
											style={styles.content} 
											placeholder="당사자 이름을 입력하세요." 
											placeholderTextColor="#808080"
											value={this.state.name}
											onChangeText={(value) => this.nameHandle(value)}
										/>
									</View>
									<View></View>
								</View>
							</View>
							<View style={styles.checkboxContainer}>
								<View style={styles.checkboxList}>
									<CheckBox style={styles.checkbox} tintColors={{ true: '#A4A4A4', false: '#A4A4A4' }} value={this.state.checkbox1} onValueChange={(newValue) => this.toggleCheckBox1(newValue)} />
									<Text style={styles.checkboxText}>회사에 사건정보의 조회 및 저장 권한을 위임합니다.</Text>
								</View>
								<View style={styles.checkboxList}>
									<CheckBox style={styles.checkbox} tintColors={{ true: '#A4A4A4', false: '#A4A4A4' }} value={this.state.checkbox2} onValueChange={(newValue) => this.toggleCheckBox2(newValue)} />
									<Text style={styles.checkboxText}>사건의 이해관계인 임을 확인합니다.</Text>
								</View>
							</View>
							<View style={styles.bottom}>
								<TouchableOpacity 
									style={[
										styles.nextButton,
										this.state.clicked ? {backgroundColor: '#C8C8C8'} : null
									]} 
									onPress={() => this.addHandler()}
									disabled={this.state.clicked ? true : false}
								>
									<Text style={styles.nextButtonText}>사건등록</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.sosongButton} onPress={() => this.checkUser()}>
									<Text style={styles.sosongText}>전자소송 등록사건 가져오기</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
						<Modal isVisible={this.state.isVisible}>
							<View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>
								<View style={{marginTop: 20, marginBottom: 20,}}>
									<View style={{justifyContent: 'flex-start', alignItems: 'flex-start', maginTop: 10, marginBottom: 10,}}>
										<Text style={{fontSize: 16, fontWeight: 'bold'}}>알림</Text>
									</View>
									<View style={{justifyContent: 'center', alignItems: 'center', maginTop: 10, marginBottom: 10,}}>
										<Text style={{fontSize: 16}}>멤버십(구독) 회원에게 제공되는 서비스입니다.</Text>
									</View>
									<TouchableOpacity style={{justifyContent: 'flex-end', alignItems: 'flex-end', maginTop: 10, marginBottom: 10,}} onPress={() => this.toggleModal()}>
										<Text style={{fontSize: 16, fontWeight: 'bold', color: '#0078D4'}}>확인</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
					</View>
				</View>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		court: state.cases.court,
		mark: state.cases.mark,
		year: state.cases.year
	}
};

const mapDispatchToProps = {
	setCase,
	clearCase,
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseAdd);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	exit: {
		marginRight: 10,
	},
	title: {

	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
		marginLeft: 18,
	},
	contentContainer: {
		flexDirection: 'column',
		width: '100%',
		marginTop: 20,
	},
	horizonLine: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '80%',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
	},
	horizon: {
		backgroundColor: '#C4C4C4',
		flex: 1,
		height: 1,
	},
	horizonText: {

	},
	lightGray: {
		color: '#C4C4C4',
		fontSize: 15,
		fontWeight: 'bold',
		width: 90,
		textAlign: 'center',
	},
	itemListContainer: {
		width: '80%',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		height: 400,
	},
	bottomLine: {
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	itemContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 8, 
		paddingBottom: 8,
		flex: 1,
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	itemContainer2: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 8,
		paddingBottom: 8,
		flex: 1,
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	titleContainer: {
		flex: 1,
	},
	contentTitle: {
		fontSize: 15,
		// fontWeight: "bold",
		color: "#0078d4",
	},
	contentInput: {
		alignItems: "flex-end",
		flex: 2,
		marginRight: 5,
	},
	content: {
		height: 40,
		fontSize: 14,
		fontWeight: 'bold',
		color: "#666666",
		textAlign: 'right',
		color: '#000',
		width: 200,
		backgroundColor: '#E5E5E5',
	},
	checkboxContainer: {
		marginTop: 10,
		width: '80%',
		marginLeft: Dimensions.get('window').width / 10
	},
	checkboxList: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	checkbox: {
		flex: 1,
	},
	checkboxText: {
		fontSize: 15,
		flex: 9,
	},
	bottom: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	nextButton: {
		backgroundColor: '#0078d4',
		borderRadius: 5,
		width: '80%',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 30,
	},
	nextButtonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF',
		margin: 13,
	},
	sosongButton: {
		width: '80%',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginBottom: 100,
	},
	sosongText: {
		textDecorationLine: 'underline',
		textDecorationColor: '#000',
		fontSize: 13,
		fontWeight: 'bold',
	},
})