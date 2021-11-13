import React, {Component} from 'react';
import {
	View,
} from 'react-native';
import {WebView} from 'react-native-webview';

class WebViewInline extends Component {
	render() {
        // console.log('inline ',this.props.html)

        let content = ''
        content = this.props.html

        if(content !== undefined && content !== null) {

            const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            content = content.replace('>청사배치<', '><')
            arr.map((value) => {
                content = content.replace(`<a class="fr blueBtn" href="#" onclick="javascript:goMove('${value}');">상세보기</a>`, '')
            })
            content = content.replace(`<div class="btnBox"><a href="#top" class="topBtn">Top</a></div>`, '')
            content = content.replace('fr blueBtn', '')
        } else {
            content = ''
        }
		return (
			<View style={{flex: 1}}>
				<WebView 
                    originWhitelist={['*']} 
                    source={{
                        html: `
                        <style>
    
                        /*
                        * 시스템명 : 홈페이지사건검색(WSF)
                        * 파일명   : layout_safind.css
                        * 작  성  자 : 마정완
                        * 작성  일자 : 2016.11.24
                        * 처리  내용 : 홈페이지사건검색 및 인터넷공고 CSS
                        * 버전  관리 : 2016.11.24 최초작성
                        *              [16A-SF-0052] [사건검색]홈페이지 개편에 따른 사건검색 개선(메인페이지) - 마정완
                        *              2016.12.06 [16A-SF-0078] [사건검색]홈페이지 사건검색 개편(반응형 웹) 관련 인쇄하기 페이지 폰트사이즈 조정 
                        *              김윤수, 2017.11.02 [17A-SF-0048] [사건검색]홈페이지사건검색 변제현황 조회 관련 안내문구 수정
                        *              권성희, 2018.02.01 [18A-SF-0014] [사건검색]각급법원홈페이지 웹접근성 심사 관련 사건검색 1차 수정
                        *              김윤수, 2018.03.22 [18A-SF-0021] [사건검색]홈페이지 나의사건검색의 저장 버튼 위치 변경
                        *              김윤수, 2018.08.23 [18A-SF-0046] [사건검색] 나의사건검색 인쇄하기 개선 
                        */
                        
                        /*************************************************/
                        /* default */   
                        /*************************************************/
                        @charset "euc-kr";
                        
                        body { font-size:1em; }
                        
                        /* text *****************************************************************************************/
                        .contentIn .blue { color:#42689c;}
                        .contentIn .red { color:#e74e3f; }
                        .contentIn .linkText { color:#42689c; text-decoration:underline; }
                        .contentIn a:hover { color:#42689c; text-decoration:underline; }
                        .contentIn .thid { }
                        .contentIn .mhid { }
                        .contentIn .phid { display:none }
                        .bold { font-weight:bold; }
                        
                        label { font-size:0px; }
                        
                        .contentIn .wordBreak { word-break:break-all; }
                        .inlineDiv { display:inline-block; }
                        
                        .dumy { height:200px;}
                        
                        img[usemap] {
                            border: none;
                            height: auto;
                            max-width: 100%;
                            width: auto;
                        }
                        
                        .fl { float:left; }
                        .fr { float:right; }
                        
                        .textAlignL { text-align:left;}
                        .textAlignR { text-align:right;}
                        .textAlignC { text-align:center;}
                        
                        .mt10 { margin-top:10px; }
                        .mt20 { margin-top:20px; }
                        .mt30 { margin-top:30px; }
                        .mt40 { margin-top:40px; }
                        .mt50 { margin-top:50px; }
                        
                        .mr10 { margin-right:10px; }
                        .mr20 { margin-right:20px; }
                        .mr30 { margin-right:30px; }
                        .mr40 { margin-right:40px; }
                        .mr50 { margin-right:50px; }
                        
                        .mb10 { margin-bottom:10px; }
                        .mb20 { margin-bottom:20px; }
                        .mb30 { margin-bottom:30px; }
                        .mb40 { margin-bottom:40px; }
                        .mb50 { margin-bottom:50px; }
                        
                        .ml10 { margin-left:10px; }
                        .ml20 { margin-left:20px; }
                        .ml30 { margin-left:30px; }
                        .ml40 { margin-left:40px; }
                        .ml50 { margin-left:50px; }
                        
                        .pt10 { padding-top:10px; }
                        .pt20 { padding-top:20px; }
                        .pt30 { padding-top:30px; }
                        .pt40 { padding-top:40px; }
                        .pt50 { padding-top:50px; }
                        
                        .pr10 { padding-right:10px; }
                        .pr20 { padding-right:20px; }
                        .pr30 { padding-right:30px; }
                        .pr40 { padding-right:40px; }
                        .pr50 { padding-right:50px; }
                        
                        .pb10 { padding-bottom:10px; }
                        .pb20 { padding-bottom:20px; }
                        .pb30 { padding-bottom:30px; }
                        .pb40 { padding-bottom:40px; }
                        .pb50 { padding-bottom:50px; }
                        
                        .w10 { width:10%; }
                        .w20 { width:20%; }
                        .w30 { width:30%; }
                        .w40 { width:40%; }
                        .w50 { width:50%; }
                        .w60 { width:60%; }
                        .w70 { width:70%; }
                        .w80 { width:80%; }
                        .w90 { width:90%; }
                        .w100 { width:100%; }
                        
                        
                        .pt10 { padding-top:10px;}
                        .pt20 { padding-top:20px; }
                        .pl10 { padding-left:10px; }
                        
                        .clear { clear:both; }
                        
                        /* popup */
                        .popup { padding:20px; }
                        .pop_header { border-top:14px solid #1f4160; height:54px; border-bottom:1px solid #c7c7c7; }
                        .pop_header .logo { margin:3px 0px 0px 20px; float:left;}
                        .pop_header .close { float:right;}
                        .postTitle { font-size:30px; color:#474747; margin:20px;}
                        .popup { border-bottom:40px solid #132431; }
                        
                        /* image *****************************************************************************************/
                        .contentIn .image01 {  width:inherit; max-width:100%; }
                        .contentIn .image03 { width:inherit; max-width:100%; }
                        .contentIn .image04 { width:inherit; max-width:100%; margin-top:20px;}
                        .contentIn .image05 { width:inherit; max-width:100%; margin-top:20px;}
                        .contentIn .image06 { width:inherit; max-width:100%;}
                        
                        .guide { padding:10px; color:#fff; background:#000; font-size:16px; margin:40px 0px 10px 0px;}
                        
                        /* form  *******************************************************************************************************/
                        
                        
                        /* btn *******************************************************************************************************/
                        .btnCategory { display:inline-block; margin:13px 3px 0 0;  color: #6892b8 !important; background:#172a3a;  font-size:16px; border:1px solid #5a6873; padding:0 22px; height:42px; line-height:42px; }
                        .btnCategory.btnSelected   {  color:#ffffff !important; background:#2c3d4c; border:1px solid #869098;}
                        a.btnGo { display:inline-block; color:#ffffff; font-size:18px; border:1px solid  #ffffff; height:36px; line-height:36px; padding:0px 56px 0px 20px; background:#183354 url("../images/btnGoBg.png") no-repeat right top; margin: 15px 0px 30px 0px; }
                        a.btnGray { font-size:14px; display:inline-block; color:#ffffff; border:1px solid  #ffffff; height:36px; line-height:36px; padding:0px 10px; background:#464646; text-align:center; }
                        a.btnRed { font-size:14px; display:inline-block; color:#ffffff; border:1px solid  #ffffff; height:36px; line-height:36px; padding:0px 10px; background:#871517; text-align:center; }
                        a:link, a:hover, a:visited, a:active { cursor:pointer; }
                        .certi .blueBtn { display:inline-block; background:#36536a; color:#fff; font-size:14px; height:30px; padding:0px 25px; margin-left:3px; line-height:30px; }
                        .contentIn .blueBtn { display:inline-block; background:#36536a; color:#fff; font-size:14px; height:30px; padding:0px 25px; margin-left:3px; line-height:30px; }
                        .contentIn .blueBtn:hover { color:#fff; text-decoration: none; }
                        .contentIn .redBtn { display:inline-block; background:#871517; color:#fff; font-size:14px; height:30px; padding:0px 25px; margin-left:3px; line-height:30px; }
                        .contentIn .redBtn:hover { color:#fff; text-decoration: none; }
                        .contentIn .downloadBtn { display:inline-block;  background:#1d7ea0 url("../images/downloadicon.png") right 6px no-repeat; padding: 8px 50px 8px 10px; font-size:14px; color:#fff; margin:5px; }
                        .contentIn .downloadBtn:hover { color:#fff; text-decoration:none; }
                        .contentIn .detailViewBtn { display:inline-block; background:#36536a; color:#fff; font-size:13px; padding:2px 10px; margin-left:3px; }
                        .contentIn .detailViewBtn:hover { color:#fff; text-decoration:none;}
                        .contentIn .topBtn { display:inline-block;  background:#1d7ea0 url("../images/topBtn.gif") right 6px no-repeat; padding: 5px 35px 5px 10px; font-size:12px; color:#fff; margin:5px;  }
                        .contentIn .topBtn:hover { color:#fff; }
                        
                        /* infoBox */
                        .infoBox { background:#f7f8fc; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px; margin-top:10px;}
                        .infoBoxGray { background:#f4f4f4 ; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px; margin-top:10px; margin-bottom:10px; }
                        .infoBoxRed { background:#f4f4f4 ; line-height:20px; font-size:14px; color:#e74e3f; border:1px solid #d1d4da; padding:10px 40px; margin-top:10px; }
                        .infoBoxWhite {line-height:20px; font-size:13px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px; margin-top:5px; overflow-y:scroll; height:70px;}
                        .infoBoxIcon01 { background:#f7f8fc url("../images/icon01.png") 10px center no-repeat; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px 10px 130px; margin-top:10px; }
                        .infoBoxIcon02 { background:#f7f8fc url("../images/icon08.png") 10px center no-repeat; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px 10px 130px; margin-top:10px; }
                        .infoBoxIcon03 { background:#f7f8fc url("../images/icon09.png") 10px center no-repeat; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px 10px 130px; margin-top:10px; }
                        .infoBoxIcon04 { background:#f7f8fc url("../images/icon10.png") 10px center no-repeat; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px 10px 130px; margin-top:10px; }
                        .infoBoxIcon05 { background:#f7f8fc url("../images/icon11.png") 10px center no-repeat; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px 10px 130px; margin-top:10px; }
                        
                        /* bannerIcon */
                        .bannerIcon { text-align:center; }
                        .bannerIcon:after { content:""; display:block; clear:both; }
                        .bannerIcon li { float:left; border:1px solid #d1d4da; width:15%; margin-right:1%; min-height: 210px; margin-top:20px;}
                        .bannerIcon li a { display:block; font-size:14px; color:#222222; margin:0 auto; padding: 15px 0px;}
                        
                        .bannerIcon li span { display:block; text-align:left; margin-top:20px; line-height:16px; padding:0px 5px;}
                        .bannerIcon li a.bani01 { border-top:5px solid #305b82; }
                        .bannerIcon li a.bani02 { border-top:5px solid #9a8073; }
                        .bannerIcon li a.bani03 { border-top:5px solid #4b8891; }
                        .bannerIcon li a.bani04 { border-top:5px solid #6c7d8a; }
                        .bannerIcon li a.bani05 { border-top:5px solid #5d6193; }
                        .bannerIcon li a.bani06 { border-top:5px solid #4379b1; }
                        
                        
                        /* form */
                        .contentIn .tableResult .result { float:left; margin-top:15px; font-weight:bold; color:#222222; }
                        .graySelect { height:30px; border: 1px solid #d0d0d0; vertical-align:top; color:#666; }
                        .grayInput { height:26px; border: 1px solid #d0d0d0; margin-left:5px; line-height:23px;}
                        
                        
                        input[type=text] { 
                            -webkit-ime-mode:active;
                            -moz-ime-mode:active;
                            -ms-ime-mode:active;
                            ime-mode:active; 
                        }
                        
                        
                        
                        .formBox { background:#f7f8fc; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px; }
                        .formBoxTxt { display:inline-block; line-height:34px;  }
                        .breakDiv { display:inline-block;  }
                        /* .formBox .breakDiv .formBoxTxt { padding-top:8px; } */
                        .formBox .graySelect, .formBox .grayInput { margin-left:5px;}
                        .formBox .downBtn { display:inline-block; padding:0px 5px 5px 5px; }
                        
                        /* 사건종류 List 위치*/
                        .formBox .layerCatg {position:absolute;left:377px;top:140px;width:183px;padding:0;background:#fff;border-bottom:2px #e9e9e9 solid;border-right:2px #e9e9e9 solid;}
                        .formBox .layerWap {position:relative;}
                        .layerCatg .l_header {height:27px;padding:5px 0 0 7px;border:1px solid #008c8a;border-bottom:none;background:url('../../img/sfr/bg_drop.gif') repeat-x left top;}
                        .layerCatg .l_conts {border:1px solid #858585;border-top:none;}
                        .layerCatg .catg_list {width:100%;padding:1px 0 3px;}
                        .layerCatg .catg_list li {padding:2px 3px 2px 7px;}
                        .layerCatg .catg_list li label {font-weight:normal;}
                        .layerCatg .catg_list li.over {background:#e2f1f0;}
                        .layerCatg .catg_list li input {vertical-align:middle;margin-right:4px;width:14px;height:14px;}
                        .layerWrap {position:relative;width:100%;height:100%;}
                        .btn_close {position:absolute;right:10px;top:8px;}
                        
                        
                        /* title */
                        .titleH2 {display:block; font-size:17px; color:#0057a1; margin-top:15px; padding-top:12px; padding-bottom:0px; background:url("../images/titleH2Bg.gif") left top no-repeat;}
                        .titleH2:after { content:""; display:block; clear:both; }
                        .titleH3 {display:block; font-size:16px; color:#222222; margin-top:15px; }
                        .titleH4 {display:block; font-size:20px; color:#0057a1; padding-top:12px; padding-bottom:10px; background:url("../images/titleH2Bg.gif") left top no-repeat;}
                        
                        /* conText */
                        .contentIn .normalText { line-height:20px; color:#36536a; }
                        .conText { font-size:14px; color:#565656; padding:5px; line-height:22px;  }
                        .conTextBul { font-size:14px; color:#565656; background:url("../images/conTextBul.png") left 12px no-repeat; padding:0px 10px 0px 10px; line-height:22px;}
                        
                        .conTextBul:after { content:""; display:block; clear:both; }
                        .attenL { font-size:14px; font-weight:bold; display:block; float:left; width:50px;}
                        .attenR { font-size:14px; float:left; width:90%; }
                        .underline { text-decoration:underline; vertical-align:top; }
                        
                        .useStep01 { max-width:100%; width:inherit; }
                        .useStep03 { max-width:100%; width:inherit; }
                        .breakDiv { display:inline-block; margin:2px;}
                        .bold { font-weight:bold; vertical-align:top;  }
                        
                        
                        /*  width  *******************************************************************************************************/
                        .w80 { width:80px; }
                        .w100 { width:100px; }
                        .w120 { width:120px; }
                        .w130 { width:130px; }
                        .w190 { width:190px; }
                        .w100p { width:100%; }
                        
                        .mt8 { margin-top:8px; }
                        .mt20 { margin-top:20px; }
                        
                        .step01 { width:inherit; max-width:100%; }
                        
                        /* container *******************************************************************************************************/
                        .container { width:100%; height: 100%; text-align:center;}
                        
                        /* top  *******************************************************************************************************/
                        .topOuter { background: #172a3a; height:67px; width:100%;}
                        .topOuter .topInner  {  max-width:1160px; margin:0 auto; }
                        
                        .topOuter .topInner .category { float:left; }
                        
                        .topOuter .topInner .utilMenu { float:right;  margin-right:10px;}
                        
                            .topOuter .topInner .topLink { float:right; height: 14px; margin-top:30px; }
                            .topOuter .topInner .topLink ul li { float:left; }
                            .topOuter .topInner .topLink ul li a { margin:0px 17px; color:#a3a7ab;} 
                            .topOuter .topInner .topLink ul li a.last { margin-right:0px; }
                            .topOuter .topInner .topLink ul li span { color: #848e97; }
                        
                        
                        /* gnbOuter *******************************************************************************************************/
                        .gnbOuter { width:100%; background: url("../images/gnb_bg.gif") repeat-x; }
                        .gnbInner { max-width: 1160px; min-width:1024px; margin:0 auto; position:relative;}
                        .gnbInner:after { content:""; display:block; clear:both; }
                        .gnbInner .logo { float: left; }
                        .gnbInner .allMenu .sns_m { display:none; }
                        .gnbInner .allMenu .topLink_m { display:none; }
                            
                            /* menu gnbMenu  */
                            .gnbInner .gnbMenu { float: right; font-size: 18px; }
                            .gnbInner .gnbMenu:after { content:""; display:block; clear:both; }
                            .gnbInner .gnbMenu .dep1 > li { float: left; }
                            .gnbInner .gnbMenu .dep1 > li > a { display:inline-block; height: 75px; margin:0px 9px; padding:0 20px; line-height: 75px; color:#000000; }
                            .gnbInner .gnbMenu .dep1 > li > a:hover { color:#006dd8; }
                            .gnbInner .gnbMenu .dep1 > li > a.selDep1 { background:url("../images/menuSelBg.png") center 62px no-repeat; }
                            .gnbInner .gnbMenu .dep1 > li > a.selDep1, .gnbInner .gnbMenu .dep1 > li > a.selDep1:hover { color:#006dd8; }
                        
                            .gnbInner .gnbMenu .dep1 > li .dep2 { display:none; position:absolute; padding-bottom:20px; left:0px; top:70px; min-width:1080px; width:100%; height:auto; border:3px solid #15528e; background:#fff url("../images/menuBgLogo.png") right bottom no-repeat;  z-index:10; }
                            .gnbInner .gnbMenu .dep1 .dep2.visDep2 { display:block; }
                            .gnbInner .gnbMenu .dep1 .dep2 .dep1title { display:none; }
                            .gnbInner .gnbMenu .dep1 .dep2 > li { float:left; width:16.6%; font-size:16px; color:#15528e; min-height:200px; height:auto; background:url("../images/menuLine.gif") right top repeat-y;  }
                            .gnbInner .gnbMenu .dep1 .dep2 > li.last { background:none; }
                            .gnbInner .gnbMenu .dep1 .dep2 > li > a { display:inline-block; padding:20px 10px; color:#15528e; font-weight:bold;}
                            .gnbInner .gnbMenu .dep1 .dep2 .dep3 li a { display:inline-block; height: 20px; font-size:13px; padding-left: 20px; line-height: 20px; color:#293135; background:url("../images/dep3dot.gif") 10px 8px no-repeat; }
                            .gnbInner .gnbMenu .dep1 .dep2 .dep3 li a:hover { color:#e74e3f; }
                            
                        
                            /* search */
                            .search { position:absolute; left:0px; top:74px; background:url("../images/searchBg.png") left top repeat; width:100%; height:84px; z-index:20; text-align:center; }
                            .search .searchSelect { font-size:14px; color:#444444; background:#ffffff; border: 1px solid #cccccc; height:35px; padding:0px 3px; vertical-align:top; margin-top:20px;}
                            .search .searchInput { font-size:14px; color:#444444;  background:#ffffff; border: 1px solid #cccccc; height:33px; padding:0px 3px; vertical-align:top; margin-top:20px; width:50%; margin-left:10px; }
                            .search .searchBtn { display:inline-block; background:#c94839 url("../images/searchIcon.png") 18px 6px no-repeat; border:1px solid #cccccc; width:60px; height:33px; margin-top:20px; margin-left:5px; }
                            .search.unVis { display:none; }
                        
                            /* menu allMenu  */
                            .gnbInner .btnMenuAll_m { display:none; }
                            .gnbInner .allMenu.unVis { display:none; }
                            .gnbInner .allMenu .subMenuView a { position:absolute; right:10px; top:10px; font-size:14px; color:#e74e3f; }
                        
                            .gnbInner .allMenu { background:#244a6e; width:100%; position:absolute; left:0px; top:75px; z-index:20; }
                            .gnbInner .allMenu:after { content:""; display:block; clear:both; }
                        
                            .gnbInner .allMenu .dep1 > li { float:left; padding-top:30px; min-height:492px; padding-bottom:20px; width:16.6%; background:url("../images/allmenuLine.gif") right top repeat-y; }
                            .gnbInner .allMenu .dep1 > li.last { background:none; }
                            .gnbInner .allMenu .dep1 > li > a { display:inline-block; color:#fff; font-size:18px; padding:20px 20px 15px 20px;}
                            
                            .gnbInner .allMenu .dep2 > li > a { display:inline-block; color:#89c7ff; font-size:14px; padding:10px 5px 3px 20px;}
                            .gnbInner .allMenu .dep2 .mPlus { background:none; }
                            .gnbInner .allMenu .dep2 .mMinus { background:none; }
                        
                            .gnbInner .allMenu .dep3 > li > a { display:inline-block; font-size:12px; color:#c7c7c7; padding:7px 5px 3px 30px; background:url("../images/allMenuD3Dot.png") 16px 11px no-repeat; } 
                        
                            .gnbInner .dep3.unVis { display:none; }
                            
                            .back { }
                            
                        
                        .menuSubBtn { margin-right: 10px; }
                        .menuSubBtn:after {  content:""; float: right;  width:100px;}
                        .menuSubBtn > a { float:right; display:inline-block; width:37px; line-height: 75px; margin: 18px 0 0 4px; }
                        .menuSubBtn > a.btnMenuAll { width:37px; height:37px; background:url("../images/btn_menuAll.gif") left top no-repeat; text-indent:-999px; overflow:hidden; }
                        .menuSubBtn > a.btnMenuAll.menuClose { background:url("../images/btn_menuAll_Close.gif") left top no-repeat; }
                        
                        /*  mainImage  *******************************************************************************************************/
                        .mainImageOuter { width: 100%; background:#0b1635; }
                        .mainImageInner { position:relative; margin:0 auto; max-width:1160px; background:url("../images/mainImageBg.jpg") repeat-y left top; min-height:543px; height:auto; } 
                        .mainImageInner:after { content:""; display:block; clear:both; }
                        
                        .mainImageInner .photo { float:left; padding-top:40px; width: 60%; /*695px;*/}
                            .mainImageInner .photo img  { width:100%; height:100%; }
                        
                        .mainImageInner .article { float:left; padding:80px 0px 0px 20px; width:38%; overflow:hidden; color:#ffffff; }
                            .mainImageInner .title a { font-size:33px; color:#ffffff; }
                            .mainImageInner .summary a { padding-top:20px; font-size:20px; line-height:30px; color:#ffffff; }
                        
                        
                            /* quick close */
                        .mainImageInner .quickMenu.close { position:relative; left:20px; margin-left:20px; /*width:430px;*/ width:37%; height: 192px; background:url("../images/quickMenuBg.png") repeat left top; overflow:hidden}
                        .mainImageInner .quickMenu:after { content:""; display:block; clear:both; }
                            
                            
                            .quickMenu.close .btnOpen { position:absolute; left:0px; top:80px; }
                            .quickMenu.close .btnOpen .tit { display:none; }
                            .quickMenu.close .title { display:none; }
                            .quickMenu.close .list ul { margin-left:50px; }
                            .quickMenu.close .list ul li { float:left; background:url("../images/quickListBg.png") no-repeat right -20px; text-align:center; margin-left:5px; width:23%;}
                            .quickMenu.close .list ul li.last { background:none; }
                            .quickMenu.close .list ul li a { display:block; /* width:90px; */ height:90px; font-size:13px; color:#fff; margin-bottom:5px;}
                            .quickMenu.close .list ul li a span { display:inline-block; margin-top: 55px; line-height: 15px; }
                        
                            .quickMenu.close .list ul li.hid { display:none; }
                            
                            .quickMenu.close .list ul li a.q1 { background:url("../images/quick01.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q2 { background:url("../images/quick02.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q3 { background:url("../images/quick03.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q4 { background:url("../images/quick04.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q5 { background:url("../images/quick05.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q6 { background:url("../images/quick06.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q7 { background:url("../images/quick07.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q8 { background:url("../images/quick08.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q9 { background:url("../images/quick09.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q7 { background:url("../images/quick10.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q11 { background:url("../images/quick11.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q12 { background:url("../images/quick12.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q13 { background:url("../images/quick13.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q14 { background:url("../images/quick14.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q15 { background:url("../images/quick15.png") no-repeat center 7px; }
                            .quickMenu.close .list ul li a.q16 { background:url("../images/quick16.png") no-repeat center 7px; }
                        
                            .quickMenu.close .quickClose { display:none; }
                        
                            /* quick open */
                        .mainImageInner .quickMenu.open { position:absolute; left:0px; top:286px; margin-left:0px; /*width:430px;*/ width:100%; height: 192px; background:url("../images/quickMenuBg.png") repeat left top; overflow:hidden}
                        .mainImageInner .quickMenu:after { content:""; display:block; clear:both; }
                            
                            
                            .quickMenu.open .btnOpen { display:none; }
                            .quickMenu.open .btnOpen .tit { display:none; }
                            .quickMenu.open .title { display:block; background:url("../images/quickTitleBg.jpg") no-repeat left top; float:left; height:192px; width:16%; }
                            .quickMenu.open .title span { display:block; font-size:18px; color:#1ca4e6; margin: 80px 0px 0px 20px;  }
                            .quickMenu.open .list ul { margin-left:50px; }
                            .quickMenu.open .list ul li { float:left; background:url("../images/quickListBg.png") no-repeat right -20px; text-align:center; margin-left:5px; width:10%;}
                            .quickMenu.open .list ul li.last { background:none; }
                            .quickMenu.open .list ul li a { display:block; /* width:90px; */ height:90px; font-size:13px; color:#fff; margin-bottom:5px;}
                            .quickMenu.open .list ul li a span { display:inline-block; margin-top: 55px;  line-height: 15px;}
                        
                            .quickMenu.open .list ul li.hid { display:block; }
                            
                            .quickMenu.open .list ul li a.q1 { background:url("../images/quick01.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q2 { background:url("../images/quick02.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q3 { background:url("../images/quick03.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q4 { background:url("../images/quick04.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q5 { background:url("../images/quick05.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q6 { background:url("../images/quick06.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q7 { background:url("../images/quick07.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q8 { background:url("../images/quick08.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q9 { background:url("../images/quick09.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q10 { background:url("../images/quick10.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q11 { background:url("../images/quick11.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q12 { background:url("../images/quick12.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q12 span { margin-top:50px; }
                            .quickMenu.open .list ul li a.q13 { background:url("../images/quick13.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q13 span { margin-top:50px; }
                            .quickMenu.open .list ul li a.q14 { background:url("../images/quick14.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q14 span { margin-top:50px; }
                            .quickMenu.open .list ul li a.q15 { background:url("../images/quick15.png") no-repeat center 7px; }
                            .quickMenu.open .list ul li a.q16 { background:url("../images/quick16.png") no-repeat center 7px; }
                        
                            .quickMenu.open .quickClose { position:absolute; right:0px; top:0px; }
                        
                        
                        /* newsArea  *******************************************************************************************************/
                        .newsArea { max-width:1160px; margin:0 auto; margin-top:47px;}
                        .newsArea:after { content:""; display:block; clear:both; } 
                            .newsArea > div { float:left; width:29%;  border:1px solid #cfcfcf; height:auto; margin-left:20px; padding:35px 10px; }
                            .newsArea .news { margin-left:0px; }
                            .newsArea .titleBox:after { content:""; display:block; clear:both;   }
                            .newsArea .titleBox .boardName { float:left; font-size:18px; color:#e74e3f; max-width:270px; }
                            .newsArea .titleBox .more { float:right; }
                            
                            .newsArea .thumb { text-align:center; margin-top:10px;}
                            .newsArea .article { margin-top: 30px; }
                                .newsArea .article .title { font-size:24px; font-weight:bold; color:#474747; line-height:28px;}
                                .newsArea .article .summary { margin-top:10px; font-size: 16px; color:#595959; line-height:22px; }
                                .newsArea .list .dotLine {  width:100%; height:11px; background:url("../images/dotLineBg.png") no-repeat right top;  margin:25px 0px; }
                                .newsArea .list ul li {  padding-bottom:10px; }
                                .newsArea .list ul li a { color:#595959; font-size:14px; }
                                .newsArea .list ul li .date { display:inline-block; float:right; color:#8e8e8e; font-size:14px; }
                        
                        /* actionZone  *******************************************************************************************************/
                        .actionZoneOuter { width:100%; height:500px; background:url("../images/actionZoneBg.gif") repeat left top; margin-top:40px; padding:20px 0px;}
                        
                        .actionZone { max-width:1160px; margin:0 auto; margin-top: 20px; }
                        .actionZone:after { content:""; display:block; clear:both; }
                            .actionZone > div { float:left; width:29%; height:auto; margin-left:20px; }
                            .actionZone .searchCourt { margin-left:0px; }
                            
                            .actionZone .searchCourt { background:url("../images/courtSearchBg.png") no-repeat center 110px;  height:410px; padding: 20px 10px 0px 10px; }
                                .actionZone .searchCourt .title { height:85px; color:#3d3d3d; font-size:22px; text-align:center; background:url("../images/searchCourtTitleBg.png") no-repeat center top; line-height:140px;}
                                .actionZone .searchCourt .description { height:120px; text-align:center; font-size:16px; color:#000000; margin-top:40px;  line-height:26px;} 
                                .actionZone .searchCourt .courtForm { text-align:center; }
                                .actionZone .searchCourt .selCap { background:#ffffff; border: 1px solid #cccccc; height:37px; vertical-align:top; padding:0px 3px; width:190px; }
                                .actionZone .searchCourt .selCourt { background:#ffffff; border: 1px solid #cccccc; height:37px; vertical-align:top; padding:0px 3px; width:120px; vertical-align:top; margin-top:4px;}
                                .actionZone .searchCourt .courtGo { display:inline-block; width:65px; height:35px; background:#871517; text-align:center; line-height:37px; color:#fff; font-size:14px; vertical-align:top;  margin-top:5px; }
                            
                            .actionZone .searchIncident { margin-top:32px; padding:0px 15px;}
                                .actionZone .searchIncident .myIncident {  }
                                .actionZone .searchIncident img { width:100%; max-width:369px; }
                                .actionZone .searchIncident .formCollect { margin-top:50px;}
                            
                        
                            .actionZone .banner { padding:10px; background:#fff; border:1px solid #cfcfcf; margin-top:31px;}
                                .actionZone .banner .titleBox { padding:0px 20px; margin-top:10px;}
                                .actionZone .banner .titleBox:after { content:""; display:block; clear:both; }
                                .actionZone .banner .titleBox .title { float:left; font-size:22px; color:#3d3d3d; padding-top:5px; }
                                .actionZone .banner .titleBox .control { float:right;  }
                                .actionZone .banner .titleBox .control .num { font-size:18px; color:#595959; vertical-align:top; padding-right:10px; line-height:30px;}
                                
                                .actionZone .banner .bannerBox { text-align:center; padding:5px 0px 14px 0px;}
                        
                        /* board  *******************************************************************************************************/
                        .board { max-width:1160px; margin:0 auto; margin-top: 20px; }
                        .board:after { content:""; display:block; clear:both; }
                            .board > div { float:left; width:29%; height:auto; margin-left:20px; padding:35px 10px; }
                            
                            .prime .titlebox { border-bottom:1px solid #e0e0e0; padding-bottom:5px;}
                            .prime .titlebox:after { content:""; display:block; clear:both; }
                            .prime .titlebox .title  { float:left; font-size:22px; color:#3d3d3d; width:190px; }
                            .prime .titlebox .more { float:right; width:30px;}
                            .prime .article { margin-top:20px; background:#f5f5f5; padding:20px 10px; font-size:18px; color:#575757; line-height:26px; height:380px;}
                            .prime .article:after { content:""; display:block; clear:both; }
                            .prime .article .black { color:#000; }
                            .prime .article .date { display:block; float:right; font-size:16px; }
                            .prime .article .moreArticle { display:block; float:right; text-align:center;  width:78px; background:#871517; height:26px; padding:0 10px; margin-top:20px; font-size:12px; color:#fff;  }
                        
                            .courtNews .titlebox { border-bottom:1px solid #e0e0e0; padding-bottom:5px;}
                            .courtNews .titlebox:after { content:""; display:block; clear:both; }
                            .courtNews .titlebox .title  { float:left; font-size:22px; color:#3d3d3d; width:190px; }
                            .courtNews .titlebox .more { float:right; width:30px;}
                            .courtNews .article { height:420px;  line-height:26px; }
                            .courtNews .article:after { content:""; display:block; clear:both; }
                            .courtNews .article .photo { width:100%; margin:0 auto; margin-top:20px;}
                            .courtNews .article .photo img { width:100%; height:100%; }
                            .courtNews .article .textbox { margin-top:20px; }
                            .courtNews .article .textbox .title { float:left; font-size:18px; color:#000; }
                            .courtNews .article .textbox .date { float: right; font-size:14px; color:#646464; }
                            .courtNews .article .textbox .text { font-size:16px; color:#575757; clear:both; padding-top:20px;}
                            .courtNews .article .moreArticle { display:block; float:right; text-align:center;  width:78px; background:#871517; height:26px; padding:0 10px; margin-top:20px; font-size:12px; color:#fff;  }
                        
                            .newsletter { text-align:center;  }
                            .newsletter a { display:block; margin-top:20px; }
                        
                        /* footer  *******************************************************************************************************/
                        .footerOut { width:100%; padding-bottom:20px; position:relative; margin-top:40px;}
                        
                            
                            /* linkLine  */
                            .linkLineOut { height:42px; width:100%; background:#0d1820; border-bottom:1px solid #2e373e; clear:both; }
                            .linkLineIn { max-width:1160px; margin:0 auto; }
                            .linkLineIn:after { content:""; display:block; clear:both; }
                            
                            .linkLineIn .footsns { float:left; }
                            .linkLineIn .footsns ul { padding-top:8px; }
                            .linkLineIn .footsns ul:after { content:""; display:block; clear:both; }
                            .linkLineIn .footsns ul li { float:left; margin-right:5px; }
                            .linkLineIn .footsns ul li a { display:inline-block; width:24px; height:25px; overflow:hidden;}
                            .linkLineIn .footsns .facebook { background:url("../images/icon_facebook.gif") left top no-repeat; }
                            .linkLineIn .footsns .facebook:hover { background:url("../images/icon_facebook.gif") left -25px no-repeat; }
                            .linkLineIn .footsns .twitter { background:url("../images/icon_twitter.gif") left top no-repeat; }
                            .linkLineIn .footsns .twitter:hover { background:url("../images/icon_twitter.gif") left -25px no-repeat; }
                            .linkLineIn .footsns .youtube { background:url("../images/icon_youtube.gif") left top no-repeat; }
                            .linkLineIn .footsns .youtube:hover { background:url("../images/icon_youtube.gif") left -25px no-repeat; }
                            .linkLineIn .footsns .instagram { background:url("../images/icon_insta.gif") left top no-repeat; }
                            .linkLineIn .footsns .instagram:hover { background:url("../images/icon_insta.gif") left -25px no-repeat; }
                            .linkLineIn .footsns .naverblog { background:url("../images/icon_naver.gif") left top no-repeat; }
                            .linkLineIn .footsns .naverblog:hover { background:url("../images/icon_naver.gif") left -25px no-repeat; }
                            .linkLineIn .footsns .daumblog { background:url("../images/icon_daum.gif") left top no-repeat; }
                            .linkLineIn .footsns .daumblog:hover { background:url("../images/icon_daum.gif") left -25px no-repeat; }
                            .linkLineIn .footsns .kakao { background:url("../images/icon_kakao.gif") left top no-repeat; }
                            .linkLineIn .footsns .kakao:hover { background:url("../images/icon_kakao.gif") left -25px no-repeat; }
                            
                            .linkLineIn .linkCourt { float:right; }
                            .linkLineIn .linkCourt > a { display:inline-block; border-left:1px solid #2e373e; border-right:1px solid #2e373e; color:#fff; font-size:14px; line-height:42px; height:42px; padding-left:20px; padding-right:45px; background:#0d1820 url("../images/down.png") right 15px no-repeat; }
                            .linkLineIn .linkCourt > a.on { background:#1b2934 url("../images/up.png") right 15px no-repeat; }
                            
                            .linkContentOut { background:#1b2934; clear:both; }
                            .linkContentOut .courtList { max-width:1160px; margin:0 auto; display:none; text-align:center;}
                            .linkContentOut .courtList.vis { display:block; }
                            .linkContentOut .courtList:after { content:""; display:block; clear:both;}
                            .linkContentOut .courtList ul { float:left; width:16%; border-left:1px solid #2e373e; padding:10px 0px; height:100%;}
                            .linkContentOut .courtList ul:after { content:""; display:block; clear:both;  }
                            .linkContentOut .courtList ul li { padding:5px 20px 5px 30px; text-align:left; }
                            .linkContentOut .courtList ul li a { color:#d1d4d6; }
                            
                            .linkLineIn .linkSystem { float:right; }
                            .linkLineIn .linkSystem > a { display:inline-block; border-right:1px solid #2e373e; color:#fff; font-size:14px; line-height:42px; height:42px; padding-left:20px; padding-right:45px; background:#0d1820 url("../images/down.png") right 15px no-repeat; }
                            .linkLineIn .linkSystem > a.on { background:#1b2934 url("../images/up.png") right 15px no-repeat; }
                            .linkLineIn .linkSystem .linkList { display:none; }
                            
                            .linkContentOut { background:#1b2934; clear:both; }
                            .linkContentOut .systemList { max-width:1160px; margin:0 auto; display:none; text-align:center;}
                            .linkContentOut .systemList.vis { display:block; }
                            .linkContentOut .systemList:after { content:""; display:block; clear:both;}
                            .linkContentOut .systemList ul { padding:10px 0px; }
                            .linkContentOut .systemList ul li { float:left; padding:5px 20px 5px 30px; width:12%; border-left:1px solid #2e373e; text-align:left;}
                            .linkContentOut .systemList ul li a { color:#d1d4d6; }
                            
                            .sitemapOut { background:#0d1820; clear:both; }
                            .sitemapOut:after { content:""; display:block; clear:both; }
                            .sitemapOut .sitemapIn { max-width:1160px; margin:0 auto; }
                            .sitemapOut .sitemapIn ul { float:left; width:16%; padding:10px 0px 20px 0px; }
                            .sitemapOut .sitemapIn ul div { padding:10px; font-size:14px; color:#8dabc3; text-align:left; }
                            .sitemapOut .sitemapIn ul li { padding:5px 10px 5px 10px; text-align:left;}
                            .sitemapOut .sitemapIn ul li a { color:#cfd1d2; font-size:13px; }
                        
                            /* // linkLine  */
                        
                            
                        
                            .footerOut .footerIn { max-width:1160px; margin:0 auto; padding-top:20px; clear:both;}
                            .footerOut .footerIn:after { content:""; display:block; clear:both; }
                            
                            .footerIn .footerLogo { float:left; width:190px; }
                            .footerIn .copybox { float:left; width:50%; }
                            .footerIn .certi { float:left; }
                            
                            /* copybox  */
                            .footerIn .copybox { margin-left:20px; }
                            .footerIn .copybox .footerLink:after { content:""; display:block; clear:both; }
                            .footerIn .copybox .footerLink ul li { float:left; }
                            .footerIn .copybox .footerLink ul li a { font-size:13px; color:#0d1820;}
                            .footerIn .copybox .footerLink ul li span { font-size:13px; color:#eee; padding: 0 10px; }
                        
                            .footerIn .copybox .address { font-size:12px; color:#0d1820; margin-top:10px; line-height:16px;}
                            .footerIn .copybox .tel { font-size:12px; color:#0d1820;  margin-top:5px; line-height:16px;}
                            .footerIn .copybox .copyright { font-size:12px; color:#0d1820; margin-top:2px; line-height:16px;} 
                        
                            .footerIn .certi img { margin-right:10px;}
                            .footerIn .certi .selCou { background:#ffffff; border: 1px solid #cccccc; height:37px; vertical-align:top; padding:0px 3px; width:120px; vertical-align:top; margin-top:4px; }
                            .footerIn .certi .siteGo { display:inline-block; padding:0 5px; height:37px; background:#36536a; text-align:center; line-height:37px; color:#fff; font-size:14px; vertical-align:top;  margin-top:5px; margin-left:3px; }
                        
                        
                        /* sub  **************************************************************************************************/
                        
                        /* sns */
                        .naviOut { width:100%; height:45px; border-bottom:1px solid #ebebeb; }
                        .naviIn { max-width:1160px; position:relative; margin:0 auto; }
                        .naviIn:after { content:""; display:block; clear:both; }
                        
                        .navibox { height:44px; float:right; }
                        .navibox div { float:left; }
                        
                        .navibox div span { padding-right:10px; }
                        .navibox .home { display:inline-block; font-size:14px; line-height:40px; color:#656565; background:url("../images/homeIcon.png") left 15px no-repeat; padding-left:25px; padding-right:10px; height:44px; }
                        .navibox .midNavi { display:inline-block; font-size:14px; line-height:40px; color:#656565; padding-right:10px; height:44px; }
                        .navibox .spot { display:inline-block; font-weight:bold; font-size:14px; line-height:40px; color:#15528e; padding-right:30px; height:44px; }
                        
                        .navibox .sns > a {margin-top:5px; margin-right:5px; display:inline-block; text-indent:-999px; padding:0px;  overflow:hidden; width:30px; height:29px; border:1px solid #cccccc; background:#f3f3f3 url("../images/snsIconOff.png") 5px 6px no-repeat;}
                        .navibox .sns.on > a {background:#0d3151 url("../images/snsIconOn.png") 5px 6px no-repeat;}
                        .navibox .print > a { margin-top:5px; margin-right:5px; display:inline-block; text-indent:-999px; padding:0px;  overflow:hidden; width:30px; height:29px; border:1px solid #cccccc; background:#f3f3f3 url("../images/printIcon.png") 5px 6px no-repeat; }
                        
                        .snsBox { display:none; }
                        .snsBox.on { display:block; position:absolute; right:0px; top:45px; z-index:10; padding:4px; background:url("../images/snsBoxBg.gif") left top repeat; }
                        .snsBox.on .snsBoxIn { background:#fff; padding:15px; }
                        .snsBox.on .snsBoxIn > span { display:inline-block; font-size:14px; color:#0d3151; vertical-align:top; margin:7px 5px 0px 0px;}
                        .snsBox.on .snsBoxIn > a { margin-left:3px; }
                        
                        /* subContainer */
                        .subContainer { max-width:1160px; margin:0 auto;  }
                        .subContainer:after { content:""; display:block; clear:both; }  
                        .subContainer > div { float:left; }
                        .subContainer > div:after { content:""; display:block; clear:both; }
                        
                            /* lnb  */
                            .subContainer .lnb {float:left; background:#f8f8f8;  /* width:225px; */  width:20%; }
                            .lnb .lnbTitle { font-size:28px; color:#fff; height:75px; background:url("../images/lnbTitleBg.gif") no-repeat right top; }
                            .lnb .lnbTitle > span {  display:block; padding:23px 0px 0px 40px; }
                            
                            .lnb .dep2 > li > a {  display:block; color:#636363; font-size:16px; padding:15px 3px 15px 20px; border-bottom:1px solid #d6dce3; border-right:1px solid #d6dce3; border-left:1px solid #d6dce3; }
                            .lnb .dep2 > li > a.selected { color:#fff; background:#193e63; border-bottom:1px solid #d6dce3; border-right:1px solid #d6dce3; border-left:1px solid #d6dce3;}
                            .lnb .dep2 > li > a.hasDep3 { background:url("../images/lnbPlus.png") right 18px no-repeat; }
                            .lnb .dep2 > li > a.hasDep3.selected { background:#193e63 url("../images/lnbMinus.png") right 18px no-repeat; }
                            .lnb .dep2 > li > a.hasDep3.open { background: url("../images/lnbMinus2.png") right 18px no-repeat; }
                        
                            .lnb .dep3 { display:none; border-right:1px solid #d6dce3; border-left:1px solid #d6dce3; border-bottom:1px solid #d6dce3; padding:15px 0; }
                            .lnb .dep3 > li > a { display:block; font-size:14px; color:#555555; padding:8px 0px 8px 40px; background:url("../images/lnbDep3Dot.png") left 13px no-repeat;}
                            .lnb .dep3 > li > a.selected { color:#e74e3f; }
                            .lnb .dep3.vis { display:block; }
                        
                        
                            /* content */
                            .subContainer .content { float:right;  width:77%; padding-left:3%; }
                        
                                .content .conTitle { font-size:30px; color:#474747; padding:23px 0px; border-bottom:1px solid #e7e7e7; }
                        
                                .contentIn .title { font-size:0px; text-indent:-999px; }
                        
                                /* result  */
                                .contentIn .tableResult { padding-top:20px; }
                                .contentIn .tableResult:after { content:""; display:block; clear:both; }
                                .contentIn .tableResult .result { float:left; margin-top:15px; font-weight:bold; color:#222222; }
                                .contentIn .tableResult .tableSearch { float:right; }
                                .contentIn .tableResult .tableSearch span { padding:0px 2px 0px 5px;}
                                
                                
                                /* tableHor  */
                                .contentIn .tableHor { width:100%; margin-top:10px; border-top:3px solid #535353; font-size:14px;}
                                .contentIn .tableHor th { background:#f3f3f3; font-size:14px;  border-bottom:1px solid #dbdbdb; padding:8px 15px; vertical-align:middle;}
                                .contentIn .tableHor tr { border-bottom:1px solid #dbdbdb; }
                                .contentIn .tableHor tr td { text-align:center; font-size:14px; padding:8px 5px; background:#fff; vertical-align:middle;  }
                                .contentIn .tableHor tr td.subTitle { background:#f3f3f3; }
                                .contentIn .tableHor tr td.tit { text-align:left; padding-left:20px; }
                                .contentIn .tableHor tr td.tit a:hover, .content .boardList tr td.tit a:active { color:#0057a1; text-decoration:underline; font-weight:bold; }
                                .contentIn .tableHor tr td.attach { vertical-align:middle; }
                                .contentIn .tableHor tr td .cover { display:inline-block; hegiht:100px; }
                                .contentIn .tableHor tr td .cover img { width:100px;    }
                                .contentIn .tableHor .showTD { display:block; }
                                
                                /* tableHorV  */
                                .contentIn .tableHorV { width:100%; margin-top:10px; border-top:3px solid #535353; font-size:14px;}
                                .contentIn .tableHorV th { background:#edf3f8; font-size:14px;  border:1px solid #dbdbdb; padding:8px 15px; vertical-align:middle; text-align:center;}
                                .contentIn .tableHorV tr { border-bottom:1px solid #dbdbdb; }
                                .contentIn .tableHorV tr td { text-align:center; font-size:14px; padding:8px 5px; border:1px solid #dbdbdb;  vertical-align:middle; background:#fff; }
                                .contentIn .tableHorV tr td.subTitle { background:#f3f3f3; }
                                .contentIn .tableHorV tr td.tit { text-align:left; padding-left:20px; }
                                .contentIn .tableHorV tr td.tit a:hover, .content .boardList tr td.tit a:active { color:#0057a1; text-decoration:underline; font-weight:bold; }
                                .contentIn .tableHorV tr td.attach { vertical-align:middle; }
                                
                        
                                /* tableVer */
                                .contentIn .tableVer { width:100%; margin-top:10px; border-top:3px solid #535353; font-size:14px;}
                                .contentIn .tableVer th { background:#f3f3f3; border-bottom:1px solid #dbdbdb; padding:8px 15px; vertical-align:middle; min-width:80px; }
                                .contentIn .tableVer td {  border-bottom:1px solid #dbdbdb; padding:8px 5px; background:#fff; vertical-align:middle; }
                                .contentIn .tableVer td.attTxt a { color:#e84c3d; text-decoration:underline;  }
                                .contentIn .tableVer td.contArea { line-height: 24px; }
                                .contentIn .tableVer th.t_prev { background:#f3f3f3 url("../images/t_prev.gif") right center no-repeat; padding-right:40px; }
                                .contentIn .tableVer th.t_next { background:#f3f3f3 url("../images/t_next.gif") right center no-repeat; padding-right:40px; }
                                .contentIn .tableVer tr td.subTitle { background:#f3f3f3; }
                                .contentIn .tableVer tr td.tit a:hover, .content .boardView tr td.tit a:active { color:#0057a1; text-decoration:underline; font-weight:bold; }
                                .contentIn .tableVer tr td span { padding: 0px 5px; }
                                
                                /* viewBox */
                                .contentIn .viewBox { border:1px solid #d1d4da; border-top:3px solid #535353; margin-top:20px;  }
                                .contentIn .viewBox .titleBox {  background:url("../images/titleBoxBg.gif") left top repeat; padding:20px; }
                                .contentIn .viewbox .titleBox .titleBoxIn:after { content:""; display:block; clear:both; }
                                .contentIn .viewBox .titleBox .titleBoxIn .title { font-size:22px; color:#383838; float:left; line-height:28px;}
                                .contentIn .viewBox .titleBox .titleBoxIn .file {  float:right; padding-top:10px; }
                                .contentIn .viewBox .titleBox .titleBoxIn .file a { display:inline-block; height:20px; line-height:20px; font-size:12px; color:#e84c3d; text-decoration:underline; background:url("../images/attfile.gif") left top no-repeat; padding-left:25px; }
                                .contentIn .viewBox .titleBox .subTitle { clear:both;  padding-top: 20px; }
                                .contentIn .viewBox .titleBox .subTitle .date { background:url("../images/iconCal.png") left top no-repeat; font-size:14px; color:#6b7174; padding-left: 20px; }
                                .contentIn .viewBox .titleBox .subTitle .writer { background:url("../images/iconWriter.png") left top no-repeat; font-size:14px; color:#6b7174; padding-left: 20px; margin-left:20px; }
                                
                                .contentIn .viewBox .contentBox { padding:20px; font-size:14px; color:#222222; line-height:18px; }
                                .contentIn .viewBox img { padding:10px;  width:100%; max-width:570px; }
                        
                                /* nextPhotoList */
                                .contentIn .nextPhotoList { margin-top:40px; border-top:1px solid #535353; border-bottom:1px solid #d1d4da; }
                                .contentIn .nextPhotoList ul { margin:15px 0px; width:100%; text-align:center;}
                                .contentIn .nextPhotoList ul li { display:inline-block; border:1px solid #d1d4da; padding:1%; margin:0px 1%; width:20%; }
                                .contentIn .nextPhotoList ul li img { width:100%; }
                                .contentIn .nextPhotoList ul li .title { text-align:left; margin:10px 0px; height:13px; overflow:hidden;}
                                .contentIn .nextPhotoList ul li .title a { font-size:13px; color:#222222; }
                                .contentIn .nextPhotoList ul li .date { text-align:left; font-size:12px; color:#6b7174; }
                                
                                /* gallery */
                                .contentIn .gallery { border-bottom:1px solid #d1d4da; margin-top:40px; padding-bottom:25px;  }
                                .contentIn .gallery ul { text-align:center; }
                                .contentIn .gallery ul:after { content:""; display:block; clear:both; }
                                .contentIn .gallery ul li { display:inline-block; border:1px solid #d1d4da; width:15%; padding:8px; margin:15px 6px; }
                                .contentIn .gallery ul li .galleryImg { display:block; text-align:center; padding-bottom:8px; }
                                .contentIn .gallery ul li .galleryImg img { width:100%;  }
                                .contentIn .gallery ul li .title { display:inline-block; font-size:14px; color:#222222; float:left; margin-top:5px; }
                                .contentIn .gallery ul li .pdf { display:inline-block; float:right; width:100%; max-width:50px;  }
                                
                                /* bookGallery */
                                .contentIn .bookGallery { border-bottom:1px solid #d1d4da; margin-top:30px; padding-bottom:25px;  }
                                .contentIn .bookGallery ul { text-align:center; }
                                .contentIn .bookGallery ul:after { content:""; display:block; clear:both; }
                                .contentIn .bookGallery ul li { display:inline-block; width:18%; padding:8px; margin:15px 1%; text-align:center; }
                                .contentIn .bookGallery ul li .galleryImg { display:inline-block; margin:0 auto;  background:url("../images/bookbg.png") left top no-repeat; }
                                .contentIn .bookGallery ul li .galleryImg img { margin:5px; width:100%; max-width:120px; }
                                .contentIn .bookGallery ul li .title { display:block; font-size:14px; color:#222222; text-align:center; margin-top:5px; line-height:18px; }
                                
                                /* tab  */
                                .contentIn .tab { margin-top: 20px; }
                                .contentIn .tab .tabTitle { background:url("../images/tabBg.gif") left bottom repeat-x; }
                                .contentIn .tab .tabTitle:after { content:""; display:block; clear:both; }
                                .contentIn .tab .tabTitle li.first { border-left:1px solid #c9c9c9; }
                                .contentIn .tab .tabTitle li { float:left; cursor:pointer;  padding:8px 40px; font-size:14px; background:#f2f2f2; border-top:1px solid #c9c9c9; border-right:1px solid #c9c9c9; border-bottom:1px solid #c9c9c9; }
                                .contentIn .tab .tabTitle li.active { color:#285ea3; border-top:2px solid #23496d; background:#fff; border-bottom:none; }
                             
                                .contentIn .tab .tabTitle a { text-decoration: none; }
                                .contentIn .tab .tabTitle a:hover { text-decoration: none; }
                                .contentIn .tab .tabTitle a.active { color:#285ea3; text-decoration: none; }
                                
                                .contentIn .tab .tabContents { border:1px solid #c9c9c9; border-top:none; padding:10px;  }
                                .contentIn .tab .tabContents .tabContent { display:none; }
                                .contentIn .tab .tabContents .tabContent.active { display:block; }
                        
                                /* subTab  */
                                .contentIn .subTab { margin-top: 20px; }
                                .contentIn .subTab .subTabTitle { background:url("../images/tabBg.gif") left bottom repeat-x; }
                                .contentIn .subTab .subTabTitle:after { content:""; display:block; clear:both; }
                                .contentIn .subTab .subTabTitle li.first { border-left:1px solid #c9c9c9; }
                                .contentIn .subTab .subTabTitle li { float:left; cursor:pointer;  padding:15px 40px; font-size:14px; background:#f2f2f2; border-top:1px solid #c9c9c9; border-right:1px solid #c9c9c9; border-bottom:1px solid #c9c9c9; }
                                .contentIn .subTab .subTabTitle li.active { color:#285ea3; border-top:2px solid #23496d; background:#fff; border-bottom:none; }
                                
                                .contentIn .subTab .subTabContents { border:1px solid #c9c9c9; border-top:none; padding:20px;  }
                                .contentIn .subTab .subTabContents .subTabContent { display:none; }
                                .contentIn .subTab .subTabContents .subTabContent.active { display:block; }
                                
                                /* subTab2  */
                                 /* .contentIn .subTab2 { margin-top: 20px; } */
                                .contentIn .subTab2 .subTabTitle2 { background:url("../images/tabBg.gif") left bottom repeat-x; }
                                .contentIn .subTab2 .subTabTitle2:after { content:""; display:block; clear:both; }
                                .contentIn .subTab2 .subTabTitle2 li.first { border-left:1px solid #c9c9c9; }
                                .contentIn .subTab2 .subTabTitle2 li { float:left; cursor:pointer;  padding:8px 40px; font-size:14px; background:#f2f2f2; border-top:1px solid #c9c9c9; border-right:1px solid #c9c9c9; border-bottom:1px solid #c9c9c9; }
                                .contentIn .subTab2 .subTabTitle2 li.active { color:#285ea3; border-top:2px solid #23496d; background:#fff; border-bottom:none; }
                                .contentIn .subTab2 .subTabTitle2 li.btn { float:right;background:#ffffff;   padding:0px; border:0px; }
                                
                                .contentIn .subTab2 .subTabTitle2 a { text-decoration: none; }
                                .contentIn .subTab2 .subTabTitle2 a:hover { text-decoration: none; }
                                .contentIn .subTab2 .subTabTitle2 a.active { color:#285ea3; text-decoration: none; }
                                
                                .contentIn .subTab2 .subTabContents { border:1px solid #c9c9c9; border-top:none; padding:10px;  }
                                .contentIn .subTab2 .subTabContents .subTabContent { display:none; }
                                .contentIn .subTab2 .subTabContents .subTabContent.active { display:block; }
                        
                                /* tabSec */
                                .contentIn .tabSec { margin-top: 20px; }
                                .contentIn .tabSec .tabTitle { background:url("../images/tabBg.gif") left bottom repeat-x; }
                                .contentIn .tabSec .tabTitle:after { content:""; display:block; clear:both; }
                                .contentIn .tabSec .tabTitle li.first { border-left:1px solid #c9c9c9; }
                                .contentIn .tabSec .tabTitle li { float:left; cursor:pointer;  padding:15px 40px; font-size:14px; background:#f2f2f2; border-top:1px solid #c9c9c9; border-right:1px solid #c9c9c9; border-bottom:1px solid #c9c9c9; }
                                .contentIn .tabSec .tabTitle li.active { color:#285ea3; border-top:2px solid #23496d; background:#fff; border-bottom:none; }
                                
                                .contentIn .tabSec .tabContents { border:1px solid #c9c9c9; border-top:none; padding:20px;  }
                                .contentIn .tabSec .tabContents .tabContent { display:none; }
                                .contentIn .tabSec .tabContents .tabContent.active { display:block; }
                                
                                /* calendar  */
                                .contentIn .calendar { margin-top:20px; }
                                .contentIn .calendar .top { background:url("../images/calBg.gif") left top repeat; color:#fff; text-align:center; padding: 8px; position:relative; }
                                .contentIn .calendar .top .year { display:inline-block; font-size:18px; vertical-align:middle; margin-top:3px; margin-right: 5px;  }
                                .contentIn .calendar .top .month { display:inline-block; font-size:24px; }
                                .contentIn .calendar .top .calL { position:absolute; left: 15px; top: 10px; display:block; width:13px; height:18px; background:url("../images/cal_left.png") left top no-repeat; text-indent:-999px; overflow:hidden; }
                                .contentIn .calendar .top .calR { position:absolute; right:15px; top: 10px; display:block; width:13px; height:18px; background:url("../images/cal_right.png") left top no-repeat; text-indent:-999px; overflow:hidden; }
                                
                                .contentIn .calendar table { width:100%; }
                                .contentIn .calendar table th { border:1px solid #dbdbdb; width:14%;  background:#dfe8f0; text-align:center;  padding:15px 0px; font-size:14; color:#222222;}
                                .contentIn .calendar table td { border:1px solid #dbdbdb; padding:5px 10px; height:100px; font-size:14px; vertical-align:top; }
                                .contentIn .calendar table td p { padding-top:3px;}
                                .contentIn .calendar table td p span { display:inline-block; padding-right:5px; font-size:13px; }
                                .contentIn .calendar table td .red { color:#e74e3f; }
                                .contentIn .calendar table td .blue { color:#0897ca; }
                                
                                /* btnBox */
                                .contentIn .btnBox { margin-top:0px; text-align:right; }
                                .contentIn .btnBoxC { margin-top:20px; text-align:center; }
                                .contentIn .btnBoxC .preBtn { background:#36536a url("../images/b_pre.png") 5px 9px no-repeat; display:inline-block; color:#fff; font-size:14px; height:30px; padding:0px 10px 0px 25px; margin-left:3px; line-height:30px; }
                                .contentIn .btnBoxC .nextBtn { background:#36536a url("../images/b_next.png") right 9px no-repeat; display:inline-block; color:#fff; font-size:14px; height:30px; padding:0px 25px 0px 10px; margin-left:3px; line-height:30px; }
                                
                                
                                /* pagelist */
                                .contentIn .pagelist {  width:100%; text-align:center; margin-top:30px; }
                                .contentIn .pagelist a.next2 { border:1px solid #bdbdbd; background:url("../images/plistNext2.gif") 10px 10px no-repeat;  width:26px; height:26px;}
                                .contentIn .pagelist a.next { border:1px solid #bdbdbd; background:url("../images/plistNext.gif") 10px 10px no-repeat;  width:26px; height:26px;}
                                .contentIn .pagelist a.prev { border:1px solid #bdbdbd; background:url("../images/plistPrev2.gif") 10px 10px no-repeat;  width:26px; height:26px;}
                                .contentIn .pagelist a.prev2 { border:1px solid #bdbdbd; background:url("../images/plistPrev.gif") 10px 10px no-repeat;  width:26px; height:26px;}
                                .contentIn .pagelist a { display:inline-block; width:26px; height:26px; line-height:26px; text-align:center; font-size:12px; border:1px solid #bdbdbd; vertical-align:top; }
                                .contentIn .pagelist a.selected { background:#535353; color:#fff; }
                                .contentIn .pagelist a.selected:hover { color:#fff; }
                                .contentIn .pagelist a:hover, .content .pagelist a:active { color:#0057a1; font-weight:bold; text-decoration:underline;}
                                
                                /* map */
                        
                                .contentIn .area2 { display:none; }
                                .contentIn .area2.optSam { display:inline-block; }
                        
                                .contentIn .map { border:1px solid #bdbdbd; margin-top:10px; }
                                .contentIn .map:after { display:block; content:""; clear:both; }
                                .contentIn .map div.mapView { float:left; }
                                
                                .contentIn .map .mapView { margin-left:45px; width:290px; height:458px; position:relative; background:url("../images/map_bg.jpg") left top no-repeat;}
                                .contentIn .map .mapView ul li { position:absolute; }
                                .contentIn .map .mapView ul li { display:block; width:36px; height:19px; overflow:hidden; text-indent:-999px; cursor:pointer; }
                                
                                .contentIn .map .mapView li.Uijeongbu {left:65px; top:62px; background:url("../images/icon_notiDisclose_Uijeongbu_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Uijeongbu:hover {background:url("../images/icon_notiDisclose_Uijeongbu_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Incheon {left:16px; top:91px; background:url("../images/icon_notiDisclose_Incheon_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Incheon:hover {background:url("../images/icon_notiDisclose_Incheon_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Seoul {left:83px; top:96px; background:url("../images/icon_notiDisclose_Seoul_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Seoul:hover {background:url("../images/icon_notiDisclose_Seoul_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Chuncheon {left:130px; top:75px; background:url("../images/icon_notiDisclose_Chuncheon_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Chuncheon:hover {background:url("../images/icon_notiDisclose_Chuncheon_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Suwon {left:75px; top:126px; background:url("../images/icon_notiDisclose_Suwon_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Suwon:hover {background:url("../images/icon_notiDisclose_Suwon_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Daejeon {left:71px; top:194px; background:url("../images/icon_notiDisclose_Daejeon_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Daejeon:hover {background:url("../images/icon_notiDisclose_Daejeon_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Cheongju {left:126px; top:180px; background:url("../images/icon_notiDisclose_Cheongju_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Cheongju:hover {background:url("../images/icon_notiDisclose_Cheongju_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Jeonju {left:77px; top:243px; background:url("../images/icon_notiDisclose_Jeonju_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Jeonju:hover {background:url("../images/icon_notiDisclose_Jeonju_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Changwon {left:167px; top:264px; background:url("../images/icon_notiDisclose_Changwon_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Changwon:hover {background:url("../images/icon_notiDisclose_Changwon_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Daegu {left:158px; top:221px; background:url("../images/icon_notiDisclose_Daegu_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Daegu:hover {background:url("../images/icon_notiDisclose_Daegu_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Gwangju {left:66px; top:299px; background:url("../images/icon_notiDisclose_Gwangju_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Gwangju:hover {background:url("../images/icon_notiDisclose_Gwangju_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Pusan {left:191px; top:297px; background:url("../images/icon_notiDisclose_Pusan_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Pusan:hover {background:url("../images/icon_notiDisclose_Pusan_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Ulsan {left:222px; top:255px; background:url("../images/icon_notiDisclose_Ulsan_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Ulsan:hover {background:url("../images/icon_notiDisclose_Ulsan_on.png") left top no-repeat;}
                                .contentIn .map .mapView li.Jaeju {left:65px; top:400px; background:url("../images/icon_notiDisclose_Jaeju_off.png") left top no-repeat;}
                                .contentIn .map .mapView li.Jaeju:hover {background:url("../images/icon_notiDisclose_Jaeju_on.png") left top no-repeat;}
                                
                                .contentIn .map div.listView { float:right; width:50%; border-left:1px solid #bdbdbd; display:none; }
                                .contentIn .map .listView .mapTitle { background:#e1e1e1; font-size:18px; color:#333; text-align:center; padding:10px; }
                                .contentIn .map .listView ul { overflow-y:scroll; height:421px; background:#e1e1e1; }
                                .contentIn .map .listView ul li { float:none; border-bottom:1px solid #bdbdbd;  padding-left:10px; background:#fff;}
                                .contentIn .map .listView ul li a { display:block;  padding:10px 5px; font-size:14px;  }
                                
                                /* bannerHor2 */
                                .contentIn .bannerHor2 ul { margin:10px auto; }
                                .contentIn .bannerHor2 ul:after { content:""; display:block; clear:both; }
                                .contentIn .bannerHor2 ul li { float: left; margin:0px 1%; width:98%; }
                                .contentIn .bannerHor2 ul li img { width:inherit; max-width:100%;}
                                
                                /* slideCont */
                                .contentIn .slideCont { margin-top:20px; }
                                .contentIn .slideCont ul li { border-bottom:1px solid #d1d4da; }
                                .contentIn .slideCont .tit {display:block; background:url("../images/slide_bul_n.png") 10px 8px no-repeat; padding:10px 5px 10px 40px; font-size:14px; }
                                .contentIn .slideCont .tit.open { color:#42689c; background:url("../images/slide_bul_o.png") 10px 8px no-repeat; }
                                .contentIn .slideCont ul li div { display:none; padding:10px;}
                                .contentIn .slideCont ul li div.sub { display:block; }
                                
                                
                                /* programBox */
                                .contentIn .programCon { text-align:left; }
                                .contentIn .programBox { position:relative; text-align:left; display:inline-block; border: 1px solid #b9b9b9; height: 300px; min-height:180px; width:30%; margin:0px 1%; margin-top:15px; }
                                .contentIn .programTitle01 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle01.jpg") right top no-repeat; }
                                .contentIn .programTitle02 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle02.jpg") right top no-repeat; }
                                .contentIn .programTitle03 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle03.jpg") right top no-repeat; }
                                .contentIn .programTitle04 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle04.jpg") right top no-repeat; }
                                .contentIn .programTitle05 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle05.jpg") right top no-repeat; }
                                .contentIn .programBox .detailViewBtn {display:block; position:absolute; right:0px; bottom:0px;}
                                
                                
                                /* banner */
                                .contentIn .bannerPage { position:relative; width:590px; height:235px; margin-top:25px;}
                                .contentIn .bannerPage .linkImg { position:absolute; width:215px; height:155px; left:20px; top:60px; }
                                .contentIn .bannerPage .linktext { position:absolute; width:285px; height: 80px; left:256px; top:60px; }
                                .contentIn .bannerPage .link1 { position:absolute; width:52px; height:48px; left:256px; top:152px; }
                                .contentIn .bannerPage .link2 { position:absolute; width:52px; height:48px; left:333px; top:152px; }
                                .contentIn .bannerPage .link3 { position:absolute; width:52px; height:48px; left:410px; top:152px; }
                                .contentIn .bannerPage .link4 { position:absolute; width:52px; height:48px; left:487px; top:152px; }
                                
                                
                                /* searchResult */
                                .searchResult { width:100%; }
                                .searchResult .conTitle { font-size:30px; color:#474747; padding:23px 0px; border-bottom:1px solid #e7e7e7; }
                                .searchResult .titleBox { font-size:18px; color:#565656; border-bottom:1px solid #535353; margin:20px 0px 10px 0px; padding-bottom:5px; }
                                .searchResult .titleBox .cate { font-size:20px; color:#0057a1; }
                                .searchResult .subTitle { font-size:14px; color:#222222; padding:20px 0px 10px 0px;}
                                .searchResult .searchCont { font-size:14px; color:#565656; line-height:20px; }
                                
                                .useStep01 { max-width:100%; width:inherit; }
                                .verTop { vertical-align:top; }
                                .verMiddle { vertical-align:middle; }
                                .verBottom { vertical-align:bottom; }
                                .lineHeight30 { line-height:30px;}
                                
                        /* //subContainer */
                        
                        /* // sub  **************************************************************************************************/
                        
                        
                        /*************************************************/
                        /* Mobile Device */   
                        /*************************************************/
                        
                        @media all and (min-width:1px) and (max-width:767px) {
                            
                            .contentIn .thid { display:none; }
                            .contentIn .mhid { display:none; }
                            .contentIn .phid { display:inline-block }
                            
                            .naviOut .naviIn .print { display:none; }
                            .navibox .home, .navibox .midNavi, .navibox .spot { display:none; }
                            
                            .contentIn .result { display:none; }
                            .contentIn .m_wid140 { width:140px; }
                            .contentIn .m_wid100 { width:100px; }
                            .contentIn .m_wid60 { width:60px; }
                            
                            /* top  *******************************************************************************************************/
                            .topOuter { background: #172a3a; height:67px; width:100%;}
                            .topOuter .topInner  {  max-width:1160px; margin:0 auto; }
                            
                            .btnCategory { display:inline-block; margin:13px 1px 0 1px;  color: #6892b8 !important; background:#172a3a;  font-size:13px; border:1px solid #5a6873; padding:0 3px; height:42px; line-height:42px; }
                            .btnCategory.btnSelected   {  color:#ffffff !important; background:#2c3d4c; border:1px solid #869098;}
                        
                            .topOuter .topInner .category { float:left; }
                        
                            .topOuter .topInner .utilMenu { float:right; width:250px; }
                                
                                .topOuter .topInner .sns { display:none;  margin-top:20px; }
                                .topOuter .topInner .sns ul li { float:left; margin-left:3px; }
                        
                                .topOuter .topInner .topLink { float:right; height: 14px; margin-top:20px; display:none; }
                                .topOuter .topInner .topLink ul li { float:left; }
                                .topOuter .topInner .topLink ul li a { margin:0px 17px; color:#a3a7ab;} 
                                .topOuter .topInner .topLink ul li a.last { margin-right:0px; }
                                .topOuter .topInner .topLink ul li span { color: #848e97; }
                        
                        
                            /* gnbOuter */
                            .gnbOuter { width:100%; background: url("../images/gnb_bg.gif") repeat-x; }
                            .gnbInner { max-width: 1024px; min-width:300px; margin:0 auto; }
                            .gnbInner:after { content:""; display:block; clear:both; }
                            .gnbInner .logo { float: left; }
                            .gnbInner .gnbMenu { display:none;}
                        
                            .menuAllBtn > a { display:inline-block; height:74px; width:38px; background:#ff6600; line-height: 74px; }
                        
                            .gnbInner .gnbMenu { display:none;} 
                        
                            .menuAllBtn > a { display:inline-block; height:74px; width:38px; background:#ff6600; line-height: 74px; }
                            
                        
                            /* menu allMenu  */
                            .gnbInner .allMenu.unVis { display:none; }
                            .gnbInner .allMenu .subMenuView { display:none; }
                            
                            .gnbInner .allMenu { background:none; width:100%; position:absolute; right:0px; top:-67px; z-index:20; }
                            .gnbInner .allMenu:after { content:""; display:block; clear:both; } 
                        
                            .gnbInner .allMenu .top_m { display:block; width:80%; background:#fff; height:50px; float:right; }
                            .gnbInner .allMenu .top_m:after { content:""; display:block; clear:none; }
                        
                            .gnbInner .allMenu .sns_m { display:block; margin-left:10px; }
                            .gnbInner .allMenu .sns_m ul { }
                            .gnbInner .allMenu .sns_m ul li { float:left; padding:13px 8px 5px 0px; } 
                            .gnbInner .allMenu .sns_m ul li a { display:block; }
                        
                            .gnbInner .btnMenuAll_m { display:block; width:37px; height:37px; float:right; background:#ff6600; text-indent:-999px;}
                            .gnbInner .btnMenuAll_m.menu_close_m { background:url("../images/btn_menuAll_Close.gif") left top no-repeat; margin:7px 10px 0px 0px;}
                        
                            .gnbInner .allMenu .topLink_m { display:block; background:#172a3a; height: 50px; width:80%; float:right; border-bottom:1px solid #2a4568; }
                            .gnbInner .allMenu .topLink_m ul { float:right;}
                            .gnbInner .allMenu .topLink_m ul li { float:left; }
                            .gnbInner .allMenu .topLink_m ul li a { display:inline-block; padding:20px 10px 0px 10px; color:#a3a7ab;} 
                            .gnbInner .allMenu .topLink_m ul li a.last { margin-right:0px; }
                            .gnbInner .allMenu .topLink_m ul li span { display:inline-block; color: #848e97; padding-top:20px;}
                            
                            .gnbInner .allMenu .dep1 { display:block; width:80%; float:right; }
                        
                            .gnbInner .allMenu .dep1 > li { float:none; width:100%; padding-top:0px; min-height:auto; padding-bottom:0px;  background:#152a4b none; } 
                            .gnbInner .allMenu .dep1 > li.last { background:#152a4b none; }
                            .gnbInner .allMenu .dep1 > li > a { display:inline-block; color:#ffffff; font-size:18px; padding:20px 20px 15px 20px;}
                            
                            .gnbInner .allMenu .dep2 > li { background:#244a6e; border-bottom:1px solid #80b1de; }
                            .gnbInner .allMenu .dep2 > li > a { display:block; color:#7cbcf7; font-size:18px; padding:15px 5px 15px 40px;}
                        
                            .gnbInner .allMenu .dep2 .mPlus { background:url("../images/menuPlus.png") right 15px no-repeat; }
                            .gnbInner .allMenu .dep2 .mMinus { background:url("../images/menuMinus.png") right 15px no-repeat; }
                        
                            .gnbInner .allMenu .dep3 > li > a { display:block; color:#152a4b; font-size:18px; padding:15px 0px 15px 60px; background:#b4b7ba none; border-bottom:1px solid #ced0d2; } 
                            
                            
                            .back { width:100%; height:100%; }
                            .back.blackOn { position:fixed; left:0px; top:0px; width:100%; height:100%; background:url("../images/black.png") repeat; z-index:19; }
                        
                            .gnbInner .dep3.unVis { display:none; }
                        
                            
                            /* search */
                            .search { position:absolute; left:0px; top:74px; background:url("../images/searchBg.png") left top repeat; width:100%; height:84px; z-index:20; text-align:center; }
                            .search .searchSelect { font-size:14px; color:#444444; background:#ffffff; border: 1px solid #cccccc; height:35px; padding:0px 3px; vertical-align:top; margin-top:20px;}
                            .search .searchInput { font-size:14px; color:#444444;  background:#ffffff; border: 1px solid #cccccc; height:33px; padding:0px 3px; vertical-align:top; margin-top:20px; width:30%; margin-left:10px; }
                            .search .searchBtn { display:inline-block; background:#c94839 url("../images/searchIcon.png") 18px 6px no-repeat; border:1px solid #cccccc; width:60px; height:33px; margin-top:20px; margin-left:5px; }
                            .search.unVis { display:none; }
                            
                            /*  mainImage  */
                            .mainImageOuter { width: 100%; background:#0b1635; }
                            .mainImageInner { margin:0 auto; background:url("../images/mainImageBg.jpg") repeat-y left top; min-height:543px; height:auto; } 
                            .mainImageInner:after { content:""; display:block; clear:both; }
                        
                            .mainImageInner .photo { padding-top:40px; width: 100%; text-align:center; width:auto; height:auto;}
                                .mainImageInner .photo img { width:90%; height:90%; }
                        
                            .mainImageInner .article { float:left; padding:40px 0px 0px 20px; width:95%; overflow:hidden; color:#ffffff; }
                                .mainImageInner .title a {  font-size:33px; color:#ffffff;}
                                .mainImageInner .summary a { padding-top:20px; font-size:20px; color:#ffffff; line-height:30px; }
                                /* .mainImageInner .quickMenu { display: none;   } */
                        
                        /* quick close */
                            .mainImageInner .quickMenu.close { position:static; margin-left:0px; /*width:430px;*/ width:100%; height:40px; background:url("../images/quickMenuBg.png") repeat left top; overflow:hidden}
                            .mainImageInner .quickMenu:after { content:""; display:block; clear:both; }
                                
                                
                                .quickMenu.close .btnOpen { position:static; display:block; }
                                .quickMenu.close .btnOpen img { display:none; }
                                .quickMenu.close .btnOpen .tit { display:block; color:#fff; font-size:13px; margin-left:0px; height:40px; line-height:40px; text-align:center;}
                                .quickMenu.close .btnOpen .tit.flag { background: url("../images/quickFlag.png") no-repeat right 15px; }
                                .quickMenu.close .title { display:none; }
                                .quickMenu.close .list ul { margin-left:0px; }
                                .quickMenu.close .list ul li { float:none; background:none; text-align:left; margin-left:5px; width:100%;}
                                .quickMenu.close .list ul li.last { background:none; }
                                .quickMenu.close .list ul li a { display:block; width:100%; height:20px; font-size:13px; color:#fff; margin-bottom:5px;}
                                .quickMenu.close .list ul li a span { display:inline-block; margin-top: 0px; line-height: 15px; }
                        
                                .quickMenu.close .list ul li.hid { display:block;}
                                .quickMenu.close .list ul li.hid a { display:block; width:100%; height:20px; font-size:13px; color:#fff; margin-bottom:5px;}
                                .quickMenu.close .list ul li.hid a span { display:inline-block; margin-top: 0px; line-height: 15px; }
                                
                                
                                .quickMenu.close .list ul li a.q1 { background:none; }
                                .quickMenu.close .list ul li a.q2 { background:none; }
                                .quickMenu.close .list ul li a.q3 { background:none; }
                                .quickMenu.close .list ul li a.q4 { background:none; }
                                .quickMenu.close .list ul li a.q5 { background:none; }
                                .quickMenu.close .list ul li a.q6 { background:none; }
                                .quickMenu.close .list ul li a.q7 { background:none; }
                                .quickMenu.close .list ul li a.q8 { background:none; }
                                .quickMenu.close .list ul li a.q9 { background:none; }
                                .quickMenu.close .list ul li a.q10 { background:none;}
                                .quickMenu.close .list ul li a.q11 { background:none; }
                                .quickMenu.close .list ul li a.q12 { background:none;}
                                .quickMenu.close .list ul li a.q12 span { margin-top:0px; }
                                .quickMenu.close .list ul li a.q13 { background:none; }
                                .quickMenu.close .list ul li a.q13 span { margin-top:0px; }
                                .quickMenu.close .list ul li a.q14 { background:none; }
                                .quickMenu.close .list ul li a.q14 span { margin-top:0px; }
                                .quickMenu.close .list ul li a.q15 { background:none; }
                                .quickMenu.close .list ul li a.q16 { background:none; }
                                
                                .quickMenu.close .quickClose { display:none; } 
                        
                        
                            /* quick open */
                            .mainImageInner .quickMenu.open { position:static; margin-left:0px; /*width:430px;*/ width:100%; height:auto; background:url("../images/quickMenuBg.png") repeat left top;}
                            .mainImageInner .quickMenu:after { content:""; display:block; clear:both; }
                                
                                
                                .quickMenu.open .btnOpen { position:static; display:block; }
                                .quickMenu.open .btnOpen img { display:none; }
                                .quickMenu.open .btnOpen .tit { display:block;  color:#fff; font-size:13px; margin-left:0px; height:40px; line-height:40px; text-align:center;}
                                .quickMenu.open .btnOpen .tit.flag { background: #041c31 url("../images/quickFlag2.png") no-repeat right 15px; }
                                .quickMenu.open .title { display:none; }
                                .quickMenu.open .list ul { margin-left:0px; margin-top:10px; }
                                .quickMenu.open .list ul li { float:none; background:none; text-align:left; margin-left:0px; width:100%;}
                                .quickMenu.open .list ul li.last { background:none; }
                                .quickMenu.open .list ul li a { display:inline-block; width:96%; height:20px; font-size:13px; color:#fff; margin-bottom:5px; padding-top:8px; padding-left:5px; margin-left:5px; border:1px solid #1d4f78; }
                                .quickMenu.open .list ul li a span { display:inline-block; margin-top: 0px; line-height: 15px; }
                        
                                .quickMenu.open .list ul li.hid { display:block; }
                                
                                
                                .quickMenu.open .list ul li a.q1 { background:none; }
                                .quickMenu.open .list ul li a.q2 { background:none; }
                                .quickMenu.open .list ul li a.q3 { background:none; }
                                .quickMenu.open .list ul li a.q4 { background:none; }
                                .quickMenu.open .list ul li a.q5 { background:none; }
                                .quickMenu.open .list ul li a.q6 { background:none; }
                                .quickMenu.open .list ul li a.q7 { background:none; }
                                .quickMenu.open .list ul li a.q8 { background:none; }
                                .quickMenu.open .list ul li a.q9 { background:none; }
                                .quickMenu.open .list ul li a.q10 { background:none;}
                                .quickMenu.open .list ul li a.q11 { background:none;}
                                .quickMenu.open .list ul li a.q12 { background:none;}
                                .quickMenu.open .list ul li a.q12 span { margin-top:0px; }
                                .quickMenu.open .list ul li a.q13 { background:none; }
                                .quickMenu.open .list ul li a.q13 span { margin-top:0px; }
                                .quickMenu.open .list ul li a.q14 { background:none; }
                                .quickMenu.open .list ul li a.q14 span { margin-top:0px; }
                                .quickMenu.open .list ul li a.q15 { background:none; }
                                .quickMenu.open .list ul li a.q16 { background:none; }
                                
                                .quickMenu.open .quickClose { display:none; } 
                        
                        
                        
                        
                            /* newsArea  */
                            .newsArea { max-width:1160px; margin:0 auto; margin-top:20px;} 
                                .newsArea > div { float:left; width:85%;  border:1px solid #cfcfcf; height:auto; margin-left:20px; padding:35px 10px; }
                                .newsArea .news { margin-left:20px; }
                                .newsArea .pan { margin-top:20px; }
                                .newsArea .broad { margin-top:20px; }
                                .newsArea .titleBox:after { content:""; display:block; clear:both;   }
                                .newsArea .titleBox .boardName { float:left; font-size:18px; color:#e74e3f; max-width:270px; }
                                .newsArea .titleBox .more { float:right; }
                                
                                .newsArea .article { margin-top: 30px; }
                                    .newsArea .article .title { font-size:24px; font-weight:bold; color:#474747; line-height:28px;}
                                    .newsArea .article .summary { margin-top:10px; font-size: 16px; color:#595959; line-height:22px; }
                                    
                                    .newsArea .list  { display:none; }
                        
                                    .newsArea .list .dotLine {  width:100%; height:11px; background:url("../images/dotLineBg.png") no-repeat right top;  margin:25px 0px; }
                                    .newsArea .list ul li { ; padding-bottom:10px; }
                                    .newsArea .list ul li a { color:#595959; font-size:14px; }
                                    .newsArea .list ul li .date { display:inline-block; float:right; color:#8e8e8e; font-size:14px;}
                            
                            /* actionZone  *******************************************************************************************************/
                                .actionZoneOuter { width:100%; height:auto; background:url("../images/actionZoneBg.gif") repeat left top; margin-top:40px; padding:20px 0px;}
                        
                                .actionZone { max-width:1160px; margin:0 auto; margin-top: 20px; }
                                .actionZone:after { content:""; display:block; clear:both; }
                                    .actionZone > div { width:85%; height:auto; margin-left:5%; }
                                    .actionZone .searchCourt { margin-left:0px; }
                                    
                                    .actionZone .searchCourt { background:url("../images/courtSearchBg.png") no-repeat center 110px;  height:410px; padding: 20px 10px 0px 10px; }
                                        .actionZone .searchCourt .title { height:85px; color:#3d3d3d; font-size:22px; text-align:center; background:url("../images/searchCourtTitleBg.png") no-repeat center top; line-height:140px;}
                                        .actionZone .searchCourt .description { height:120px; text-align:center; font-size:16px; color:#000000; margin-top:40px;  line-height:26px;} 
                                        .actionZone .searchCourt .courtForm { text-align:center; }
                                        .actionZone .searchCourt .selCap { background:#ffffff; border: 1px solid #cccccc; height:37px; vertical-align:top; padding:0px 3px; width:190px; }
                                        .actionZone .searchCourt .selCourt { background:#ffffff; border: 1px solid #cccccc; height:37px; vertical-align:top; padding:0px 3px; width:120px; vertical-align:top; margin-top:4px;}
                                        .actionZone .searchCourt .courtGo { display:inline-block; width:65px; height:35px; background:#871517; text-align:center; line-height:37px; color:#fff; font-size:14px; vertical-align:top;  margin-top:5px; }
                                    
                                    
                                    .actionZone .searchIncident { margin-top:32px; padding:0px 15px;}
                                        .actionZone .searchIncident .myIncident { width:95%; text-align:center;}
                                        .actionZone .searchIncident img { width:100%; max-width:369px; }
                                        .actionZone .searchIncident .formCollect { margin-top:20px; width:95%; text-align:center;}
                                    
                                    
                                    
                        
                        
                                    .actionZone .banner { padding:0px; background:#fff; border:1px solid #cfcfcf; margin-top:20px;}
                                        .actionZone .banner .titleBox { padding:0px 20px; margin-top:10px;}
                                        .actionZone .banner .titleBox:after { content:""; display:block; clear:both; }
                                        .actionZone .banner .titleBox .title { float:left; font-size:22px; color:#3d3d3d; padding-top:5px; }
                                        .actionZone .banner .titleBox .control { float:right;  }
                                        .actionZone .banner .titleBox .control .num { font-size:18px; color:#595959; vertical-align:top; padding-right:10px; line-height:30px;}
                                        
                                        .actionZone .banner .bannerBox { text-align:center; padding:5px 0px 14px 0px;}
                        
                            /* board  *******************************************************************************************************/
                            .board { max-width:1160px; margin:0 auto; margin-top: 20px; }
                            .board:after { content:""; display:block; clear:both; }
                                .board > div { width:90%; height:auto; padding:35px 10px; margin-left:5%; }
                                .board .newsletter { padding:0px; }
                                
                                
                                .prime .titlebox { border-bottom:1px solid #e0e0e0; padding-bottom:5px;}
                                .prime .titlebox:after { content:""; display:block; clear:both; }
                                .prime .titlebox .title  { float:left; font-size:22px; color:#3d3d3d; width:190px; }
                                .prime .titlebox .more { float:right; width:30px;}
                                .prime .article { margin-top:20px; background:#f5f5f5; padding:20px 10px; font-size:18px; color:#575757; line-height:26px; height:auto;}
                                .prime .article:after { content:""; display:block; clear:both; }
                                .prime .article .black { color:#000; }
                                .prime .article .date { display:block; float:right; font-size:16px; }
                                .prime .article .moreArticle { display:block; float:right; text-align:center;  width:78px; background:#871517; height:26px; padding:0 10px; margin-top:10px; font-size:12px; color:#fff;  }
                        
                                .courtNews .titlebox { border-bottom:1px solid #e0e0e0; padding-bottom:5px;}
                                .courtNews .titlebox:after { content:""; display:block; clear:both; }
                                .courtNews .titlebox .title  { float:left; font-size:22px; color:#3d3d3d; width:190px; }
                                .courtNews .titlebox .more { float:right; width:30px;}
                                .courtNews .article { height:420px;  line-height:26px; }
                                .courtNews .article:after { content:""; display:block; clear:both; }
                                .courtNews .article .photo { width:100%; margin:0 auto; margin-top:20px;}
                                .courtNews .article .photo img { width:100%; height:100%; }
                                .courtNews .article .textbox { margin-top:10px; }
                                .courtNews .article .textbox .title { float:left; font-size:18px; color:#000; }
                                .courtNews .article .textbox .date { float: right; font-size:14px; color:#646464; }
                                .courtNews .article .textbox .text { font-size:16px; color:#575757; clear:both; padding-top:5px;}
                                .courtNews .article .moreArticle { display:block; text-align:center;  width:78px; background:#871517; height:26px; padding:0 10px; margin-top:10px; font-size:12px; color:#fff;  }
                        
                                .newsletter { text-align:center; margin-top:5px; padding:0px; }
                            
                            /* sub  **************************************************************************************************/
                        
                                /* lnb  */
                                .subContainer .lnb { display:none }
                                
                                /* content */
                                .subContainer .content { float:none;  width:96%; padding:0 2%; }
                                
                                /* bookGallery */
                                .contentIn .bookGallery { border-bottom:1px solid #d1d4da; margin-top:30px; padding-bottom:25px;  }
                                .contentIn .bookGallery ul { text-align:center; }
                                .contentIn .bookGallery ul:after { content:""; display:block; clear:both; }
                                .contentIn .bookGallery ul li { display:inline-block; width:18%; padding:5px; margin:15px 1%; text-align:center; }
                                .contentIn .bookGallery ul li .galleryImg { display:inline-block; margin:0 auto;  background:none; }
                                .contentIn .bookGallery ul li .galleryImg img { margin:5px; width:inherit; max-width:100%; }
                                .contentIn .bookGallery ul li .title { display:block; font-size:14px; color:#222222; text-align:center; margin-top:5px; }
                                
                                /* tab  */
                                .contentIn .tab { margin-top: 20px; }
                                .contentIn .tab .tabTitle { background:url("../images/tabBg.gif") left bottom repeat-x; }
                                .contentIn .tab .tabTitle:after { content:""; display:block; clear:both; }
                                .contentIn .tab .tabTitle li.first { border-left:1px solid #c9c9c9; }
                                .contentIn .tab .tabTitle li { float:left; cursor:pointer;  padding:15px 5px; font-size:14px; background:#f2f2f2; border-top:1px solid #c9c9c9; border-right:1px solid #c9c9c9; border-bottom:1px solid #c9c9c9; }
                                .contentIn .tab .tabTitle li.active { color:#285ea3; border-top:2px solid #23496d; background:#fff; border-bottom:none; }
                                
                                .contentIn .tab .tabContents { border:1px solid #c9c9c9; border-top:none; padding:20px;  }
                                .contentIn .tab .tabContents .tabContent { display:none; }
                                .contentIn .tab .tabContents .tabContent.active { display:block; }
                                
                                /* subTab  */
                                .contentIn .subTab { margin-top: 20px; }
                                .contentIn .subTab .subTabTitle { background:url("../images/tabBg.gif") left bottom repeat-x; }
                                .contentIn .subTab .subTabTitle:after { content:""; display:block; clear:both; }
                                .contentIn .subTab .subTabTitle li.first { border-left:1px solid #c9c9c9; }
                                .contentIn .subTab .subTabTitle li { float:left; cursor:pointer;  padding:15px 5px; font-size:14px; background:#f2f2f2; border-top:1px solid #c9c9c9; border-right:1px solid #c9c9c9; border-bottom:1px solid #c9c9c9; }
                                .contentIn .subTab .subTabTitle li.active { color:#285ea3; border-top:2px solid #23496d; background:#fff; border-bottom:none; }
                                
                                .contentIn .subTab .subTabContents { border:1px solid #c9c9c9; border-top:none; padding:20px;  }
                                .contentIn .subTab .subTabContents .subTabContent { display:none; }
                                .contentIn .subTab .subTabContents .subTabContent.active { display:block; }
                                
                                /* tabSec */
                                .contentIn .tabSec { margin-top: 20px; }
                                .contentIn .tabSec .tabTitle { background:url("../images/tabBg.gif") left bottom repeat-x; }
                                .contentIn .tabSec .tabTitle:after { content:""; display:block; clear:both; }
                                .contentIn .tabSec .tabTitle li.first { border-left:1px solid #c9c9c9; }
                                .contentIn .tabSec .tabTitle li { float:left; cursor:pointer;  padding:15px 2px; font-size:14px; background:#f2f2f2; border-top:1px solid #c9c9c9; border-right:1px solid #c9c9c9; border-bottom:1px solid #c9c9c9; }
                                .contentIn .tabSec .tabTitle li.active { color:#285ea3; border-top:2px solid #23496d; background:#fff; border-bottom:none; }
                                
                                .contentIn .tabSec .tabContents { border:1px solid #c9c9c9; border-top:none; padding:20px;  }
                                .contentIn .tabSec .tabContents .tabContent { display:none; }
                                .contentIn .tabSec .tabContents .tabContent.active { display:block; }
                                
                                /* tableHor  */
                                .contentIn .tableHor { width:100%; margin-top:10px; border-top:3px solid #535353; font-size:14px;}
                                .contentIn .tableHor th { background:#f3f3f3; font-size:14px;  border-bottom:1px solid #dbdbdb; padding:8px 15px; vertical-align:middle;}
                                .contentIn .tableHor tr { border-bottom:1px solid #dbdbdb; }
                                .contentIn .tableHor tr td { text-align:center; font-size:14px; padding:8px 5px; background:#fff; vertical-align:middle;  }
                                .contentIn .tableHor tr td.subTitle { background:#f3f3f3; }
                                .contentIn .tableHor tr td.tit { text-align:left; padding-left:20px; }
                                .contentIn .tableHor tr td.tit a:hover, .content .boardList tr td.tit a:active { color:#0057a1; text-decoration:underline; font-weight:bold; }
                                .contentIn .tableHor tr td.attach { vertical-align:middle; }
                                .contentIn .tableHor tr td .cover { display:inline-block; hegiht:100px; }
                                .contentIn .tableHor tr td .cover img { width:100px;    }
                                
                                /* tableHorV  */
                                .contentIn .tableHorV { width:100%; margin-top:10px; border-top:3px solid #535353; font-size:14px;}
                                .contentIn .tableHorV th { background:#edf3f8; font-size:14px;  border:1px solid #dbdbdb; padding:8px 15px; vertical-align:middle; text-align:center;}
                                .contentIn .tableHorV tr { border-bottom:1px solid #dbdbdb; }
                                .contentIn .tableHorV tr td { text-align:center; font-size:14px; padding:8px 5px; border:1px solid #dbdbdb;  vertical-align:middle; background:#fff; }
                                .contentIn .tableHorV tr td.subTitle { background:#f3f3f3; }
                                .contentIn .tableHorV tr td.tit { text-align:left; padding-left:20px; }
                                .contentIn .tableHorV tr td.tit a:hover, .content .boardList tr td.tit a:active { color:#0057a1; text-decoration:underline; font-weight:bold; }
                                .contentIn .tableHorV tr td.attach { vertical-align:middle; }
                                
                        
                                /* tableVer */
                                .contentIn .tableVer { width:100%; margin-top:10px; border-top:3px solid #535353; font-size:14px;}
                                .contentIn .tableVer th { background:#f3f3f3; border-bottom:1px solid #dbdbdb; padding:8px 15px; vertical-align:middle; min-width:50px; }
                                .contentIn .tableVer td {  border-bottom:1px solid #dbdbdb; padding:8px 5px; background:#fff; vertical-align:middle;}
                                .contentIn .tableVer td.attTxt a { color:#e84c3d; text-decoration:underline;  }
                                .contentIn .tableVer td.contArea { line-height: 24px; }
                                .contentIn .tableVer th.t_prev { background:#f3f3f3 url("../images/t_prev.gif") right center no-repeat; padding-right:40px; }
                                .contentIn .tableVer th.t_next { background:#f3f3f3 url("../images/t_next.gif") right center no-repeat; padding-right:40px; }
                                .contentIn .tableVer tr td.subTitle { background:#f3f3f3; }
                                .contentIn .tableVer tr td.tit a:hover, .content .boardView tr td.tit a:active { color:#0057a1; text-decoration:underline; font-weight:bold; }
                                .contentIn .tableVer tr td span { padding: 0px 5px; }
                                
                                
                                /* infoBox */
                                .infoBox { background:#f7f8fc; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 20px; margin-top:10px;}
                                .infoBoxGray { background:#f4f4f4 ; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 20px; margin-top:10px;}
                                .infoBoxRed { background:#f4f4f4 ; line-height:20px; font-size:14px; color:#e74e3f; border:1px solid #d1d4da; padding:10px 20px; margin-top:10px; }
                                .infoBoxWhite {line-height:20px; font-size:13px; color:#36536a; border:1px solid #d1d4da; padding:10px 20px; margin-top:5px; overflow-y:scroll; height:70px;}
                                .infoBoxIcon01 { background:#f7f8fc url("../images/icon01.png") 10px center no-repeat; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px 10px 130px; margin-top:10px; }
                                .infoBoxIcon02 { background:#f7f8fc url("../images/icon08.png") 10px center no-repeat; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px 10px 130px; margin-top:10px; }
                                .infoBoxIcon03 { background:#f7f8fc url("../images/icon09.png") 10px center no-repeat; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px 10px 130px; margin-top:10px; }
                                .infoBoxIcon04 { background:#f7f8fc url("../images/icon10.png") 10px center no-repeat; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px 10px 130px; margin-top:10px; }
                                .infoBoxIcon05 { background:#f7f8fc url("../images/icon11.png") 10px center no-repeat; line-height:20px; font-size:14px; color:#36536a; border:1px solid #d1d4da; padding:10px 40px 10px 130px; margin-top:10px; }
                                
                                
                                /* pagelist */
                                .contentIn .pagelist {  width:100%; text-align:center; margin-top:30px; }
                                .contentIn .pagelist a.next2 { border:1px solid #bdbdbd; background:url("../images/plistNext2.gif") 6px 7px no-repeat;  width:20px; height:20px;}
                                .contentIn .pagelist a.next { border:1px solid #bdbdbd; background:url("../images/plistNext.gif") 6px 7px no-repeat;  width:20px; height:20px;}
                                .contentIn .pagelist a.prev { border:1px solid #bdbdbd; background:url("../images/plistPrev2.gif") 6px 7px no-repeat;  width:20px; height:20px;}
                                .contentIn .pagelist a.prev2 { border:1px solid #bdbdbd; background:url("../images/plistPrev.gif") 6px 7px no-repeat;  width:20px; height:20px;}
                                .contentIn .pagelist a { display:inline-block; width:15px; height:20px; line-height:20px; text-align:center; font-size:12px; border:1px solid #bdbdbd; vertical-align:top; }
                                .contentIn .pagelist a.selected { background:#535353; color:#fff; }
                                .contentIn .pagelist a.selected:hover { color:#fff; }
                                .contentIn .pagelist a:hover, .content .pagelist a:active { color:#0057a1; font-weight:bold; text-decoration:underline;}
                                
                                /* tabContents pagelist */
                                .contentIn .tabContents .pagelist {  width:100%; text-align:center; margin-top:30px; }
                                .contentIn .tabContents .pagelist a.next2 { border:1px solid #bdbdbd; background:url("../images/plistNext2.gif") 6px 7px no-repeat;  width:20px; height:20px;}
                                .contentIn .tabContents .pagelist a.next { border:1px solid #bdbdbd; background:url("../images/plistNext.gif") 6px 7px no-repeat;  width:20px; height:20px;}
                                .contentIn .tabContents .pagelist a.prev { border:1px solid #bdbdbd; background:url("../images/plistPrev2.gif") 6px 7px no-repeat;  width:20px; height:20px;}
                                .contentIn .tabContents .pagelist a.prev2 { border:1px solid #bdbdbd; background:url("../images/plistPrev.gif") 6px 7px no-repeat;  width:20px; height:20px;}
                                .contentIn .tabContents .pagelist a { display:inline-block; width:13px; height:20px; line-height:20px; text-align:center; font-size:12px; border:1px solid #bdbdbd; vertical-align:top; }
                                .contentIn .tabContents .pagelist a.selected { background:#535353; color:#fff; }
                                .contentIn .tabContents .pagelist a.selected:hover { color:#fff; }
                                .contentIn .tabContents .pagelist a:hover, .content .pagelist a:active { color:#0057a1; font-weight:bold; text-decoration:underline;}
                                
                                /* gallery */
                                .contentIn .gallery { border-bottom:1px solid #d1d4da; margin-top:40px; padding-bottom:25px;  }
                                .contentIn .gallery ul { text-align:center; }
                                .contentIn .gallery ul:after { content:""; display:block; clear:both; }
                                .contentIn .gallery ul li { display:inline-block; border:1px solid #d1d4da; width:15%; padding:4px; margin:12px 2px; }
                                .contentIn .gallery ul li .galleryImg { display:block; text-align:center; padding-bottom:8px; }
                                .contentIn .gallery ul li .galleryImg img { width:100%;  }
                                .contentIn .gallery ul li .title { display:inline-block; font-size:12px; color:#222222; float:left; margin-top:5px; }
                                .contentIn .gallery ul li .pdf { display:inline-block; float:right; width:100%; max-width:50px;  }
                                
                                /* nextPhotoList */
                                .contentIn .nextPhotoList { margin-top:40px; border-top:1px solid #535353; border-bottom:1px solid #d1d4da; }
                                .contentIn .nextPhotoList ul { margin:15px 0px; width:100%; text-align:center;}
                                .contentIn .nextPhotoList ul li { display:inline-block; border:1px solid #d1d4da; padding:1%; margin:0px 1%; width:18%; }
                                .contentIn .nextPhotoList ul li img { width:100%; }
                                .contentIn .nextPhotoList ul li .title { text-align:left; margin:10px 0px; height:13px; overflow:hidden;}
                                .contentIn .nextPhotoList ul li .title a { font-size:13px; color:#222222; }
                                .contentIn .nextPhotoList ul li .date { text-align:left; font-size:10px; color:#6b7174; }
                                
                                /* bannerIcon */
                                .bannerIcon { text-align:center; }
                                .bannerIcon:after { content:""; display:block; clear:both; }
                                .bannerIcon li { clear:both; border:1px solid #d1d4da; width:100%;  min-height: auto; margin-top:20px; text-align:center;}
                                .bannerIcon li a { display:block; font-size:14px; color:#222222; margin:0 auto; padding: 15px 0px;}
                                
                                .bannerIcon li span { display:block; text-align:center;  margin-top:20px; line-height:16px; padding:0px 5px;}
                                .bannerIcon li a.bani01 { border-top:5px solid #305b82; }
                                .bannerIcon li a.bani02 { border-top:5px solid #9a8073; }
                                .bannerIcon li a.bani03 { border-top:5px solid #4b8891; }
                                .bannerIcon li a.bani04 { border-top:5px solid #6c7d8a; }
                                .bannerIcon li a.bani05 { border-top:5px solid #5d6193; }
                                .bannerIcon li a.bani06 { border-top:5px solid #4379b1; }
                                
                                
                                /* map */
                                .contentIn .map .mapView { margin-left:0px; width:290px; height:458px; position:relative; background:url("../images/map_bg.jpg") left top no-repeat;} 
                        
                            /* footer  *******************************************************************************************************/
                            
                            .sitemapOut { display:none; background:#0d1820; clear:both; }
                            
                            .linkLineIn { display:none;  }
                            
                            .footerOut .footerIn { max-width:1160px; margin:0 auto; padding-top:20px; clear:both;}
                            .footerOut .footerIn:after { content:""; display:block; clear:both; }
                            
                            .footerIn .footerLogo { float:left; width:190px; display:none; }
                            .footerIn .copybox { float:left; width:90%; }
                            .footerIn .certi { float:left; }
                            
                            /* copybox  */
                            .footerIn .copybox { margin-left:20px; }
                            .footerIn .copybox .footerLink:after { content:""; display:block; clear:both; }
                            .footerIn .copybox .footerLink ul li { clear:both; }
                            .footerIn .copybox .footerLink ul li a { font-size:13px; color:#0d1820;}
                            .footerIn .copybox .footerLink ul li span { font-size:13px; color:#eee; padding: 0 10px; }
                        
                            .footerIn .copybox .address { font-size:12px; color:#0d1820; margin-top:10px;}
                            .footerIn .copybox .tel { font-size:12px; color:#0d1820;  margin-top:5px; }
                            .footerIn .copybox .copyright { font-size:12px; color:#0d1820; margin-top:2px; } 
                        
                            .footerIn .certi { display:none; }
                            .footerIn .certi img { margin-right:10px;  }
                            .footerIn .certi .selCou { background:#ffffff; border: 1px solid #cccccc; height:37px; vertical-align:top; padding:0px 3px; width:120px; vertical-align:top; margin-top:4px; }
                            .footerIn .certi .siteGo { display:inline-block; padding:0 5px; height:37px; background:#36536a; text-align:center; line-height:37px; color:#fff; font-size:14px; vertical-align:top;  margin-top:5px; margin-left:3px; }
                            
                            
                            
                        /* sub *******************************************************************************************************/
                            
                            /* map ******************************************************************************************************/
                            .contentIn .map .mapView { width:290px; height:458px; position:relative; background:url("../images/map_bg.jpg") left top no-repeat;}
                            .contentIn .map div.listView { clear:both; width:100%; border-left:none; border-top:1px solid #bdbdbd;}
                            
                            /* programBox */
                                .contentIn .programCon { text-align:left; }
                                .contentIn .programBox { position:relative; text-align:left; display:inline-block; border: 1px solid #b9b9b9; height:auto; min-height:180px; width:98%; margin:0px 1%; margin-top:15px; }
                                .contentIn .programTitle01 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle01.jpg") right top no-repeat; }
                                .contentIn .programTitle02 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle02.jpg") right top no-repeat; }
                                .contentIn .programTitle03 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle03.jpg") right top no-repeat; }
                                .contentIn .programTitle04 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle04.jpg") right top no-repeat; }
                                .contentIn .programTitle05 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle05.jpg") right top no-repeat; }
                                .contentIn .programBox .detailViewBtn {display:block; position:absolute; right:0px; bottom:0px;}
                        
                        }
                        
                        
                        
                        
                        /*************************************************/
                        /* Tablet Device */   
                        /*************************************************/
                        
                        @media all and (min-width:768px) and (max-width:1024px) {
                            
                            
                            .contentIn .thid { display:none; }
                            
                            /* top  *******************************************************************************************************/
                            .topOuter { background: #172a3a; height:67px; width:100%;}
                            .topOuter .topInner  {  max-width:1160px; margin:0 auto; }
                        
                            .topOuter .topInner .category { float:left; }
                        
                            .topOuter .topInner .utilMenu { float:right; width:250px; }
                                
                                .topOuter .topInner .sns { display:none;  margin-top:20px; }
                                .topOuter .topInner .sns ul li { float:left; margin-left:3px; }
                        
                                .topOuter .topInner .topLink { float:right; height: 14px; margin-top:10px; display:none; }
                                .topOuter .topInner .topLink ul li { float:left; }
                                .topOuter .topInner .topLink ul li a { margin:0px 17px; color:#a3a7ab;} 
                                .topOuter .topInner .topLink ul li a.last { margin-right:0px; }
                                .topOuter .topInner .topLink ul li span { color: #848e97; }
                        
                        
                                /* gnbOuter */
                                .gnbOuter { width:100%; background: url("../images/gnb_bg.gif") repeat-x; position:relative; }
                                .gnbInner { max-width: 1024px; min-width:769px; margin:0 auto; }
                                .gnbInner:after { content:""; display:block; clear:both; }
                                .gnbInner .logo { float: left; }
                                .gnbInner .gnbMenu { display:none;}
                        
                                .menuAllBtn > a { display:inline-block; height:74px; width:38px; background:#ff6600; line-height: 74px; }
                        
                                .gnbInner .gnbMenu { display:none;} 
                        
                                .menuAllBtn > a { display:inline-block; height:74px; width:38px; background:#ff6600; line-height: 74px; }
                        
                                /* menu allMenu  */
                                .gnbInner .allMenu.unVis { display:none; }
                                .gnbInner .allMenu .subMenuView { display:none; }
                                
                                .gnbInner .allMenu { background:none; width:100%; position:absolute; right:0px; top:-67px; z-index:20; }
                                .gnbInner .allMenu:after { content:""; display:block; clear:both; } 
                        
                                .gnbInner .allMenu .top_m { display:block; width:80%; background:#fff; height:50px; float:right; }
                                .gnbInner .allMenu .top_m:after { content:""; display:block; clear:none; }
                        
                                .gnbInner .allMenu .sns_m { display:block; margin-left:10px; }
                                .gnbInner .allMenu .sns_m ul { }
                                .gnbInner .allMenu .sns_m ul li { float:left; padding:13px 8px 5px 0px; } 
                                .gnbInner .allMenu .sns_m ul li a { display:block; }
                        
                                .gnbInner .btnMenuAll_m { display:block; width:37px; height:37px; float:right; background:#ff6600; text-indent:-999px;}
                                .gnbInner .btnMenuAll_m.menu_close_m { background:url("../images/btn_menuAll_Close.gif") left top no-repeat; margin:7px 10px 0px 0px;}
                        
                                .gnbInner .allMenu .topLink_m { display:block; background:#172a3a; height: 50px; width:80%; float:right; border-bottom:1px solid #2a4568; }
                                .gnbInner .allMenu .topLink_m ul { float:right;}
                                .gnbInner .allMenu .topLink_m ul li { float:left; }
                                .gnbInner .allMenu .topLink_m ul li a { display:inline-block; padding:20px 10px 0px 10px; color:#a3a7ab;} 
                                .gnbInner .allMenu .topLink_m ul li a.last { margin-right:0px; }
                                .gnbInner .allMenu .topLink_m ul li span { color: #848e97; }
                                
                                .gnbInner .allMenu .dep1 { display:block; width:80%; float:right; }
                        
                                .gnbInner .allMenu .dep1 > li { float:none; width:100%; padding-top:0px; min-height:auto; padding-bottom:0px;  background:#152a4b none; } 
                                .gnbInner .allMenu .dep1 > li.last { background:#152a4b none; }
                                .gnbInner .allMenu .dep1 > li > a { display:inline-block; color:#ffffff; font-size:18px; padding:20px 20px 15px 20px;}
                                
                                .gnbInner .allMenu .dep2 > li { background:#244a6e; border-bottom:1px solid #80b1de; }
                                .gnbInner .allMenu .dep2 > li > a { display:block; color:#7cbcf7; font-size:18px; padding:15px 5px 15px 40px; }
                                .gnbInner .allMenu .dep2 .mPlus { background:url("../images/menuPlus.png") right 15px no-repeat; }
                                .gnbInner .allMenu .dep2 .mMinus { background:url("../images/menuMinus.png") right 15px no-repeat; }
                        
                        
                                .gnbInner .allMenu .dep3 > li > a { display:block; color:#152a4b; font-size:18px; padding:15px 0px 15px 60px; background:#b4b7ba none; border-bottom:1px solid #ced0d2; } 
                                
                                .gnbInner .dep3.unVis { display:none; }
                                
                                .back { width:100%; height:100%; }
                                .back.blackOn { position:fixed; left:0px; top:0px; width:100%; height:100%; background:url("../images/black.png") repeat; z-index:19; }
                                
                        
                        
                            /*  mainImage  *******************************************************************************************************/
                            .mainImageOuter { width: 100%; background:#0b1635; }
                            .mainImageInner { margin:0 auto; background:url("../images/mainImageBg.jpg") repeat-y left top; height:auto; } 
                            .mainImageInner:after { content:""; display:block; clear:both; }
                        
                            .mainImageInner .photo { padding-top:40px; width: 100%; text-align:center;}
                                .mainImageInner .photo img { width:90%; height:90%; }
                        
                            .mainImageInner .article { padding:40px 0px 0px 20px; width:95%; overflow:hidden; color:#ffffff; }
                                .mainImageInner .title a {  font-size:33px; color:#ffffff;}
                                .mainImageInner .summary a { padding-top:20px; font-size:20px; color:#ffffff; line-height:30px; }
                                /* .mainImageInner .quickMenu { display: none;   } */
                        
                            /* quick close */
                            .mainImageInner .quickMenu.close { position:static; margin-left:0px; /*width:430px;*/ width:100%; height:40px; background:url("../images/quickMenuBg.png") repeat left top; overflow:hidden}
                            .mainImageInner .quickMenu:after { content:""; display:block; clear:both; }
                                
                                
                                .quickMenu.close .btnOpen { position:static; display:block; }
                                .quickMenu.close .btnOpen img { display:none; }
                                .quickMenu.close .btnOpen .tit { display:block; color:#fff; font-size:13px; margin-left:0px; height:40px; line-height:40px; text-align:center;}
                                .quickMenu.close .btnOpen .tit.flag { background: url("../images/quickFlag.png") no-repeat right 15px; }
                                .quickMenu.close .title { display:none; }
                                .quickMenu.close .list ul { margin-left:0px; }
                                .quickMenu.close .list ul li { float:none; background:none; text-align:left; margin-left:5px; width:100%;}
                                .quickMenu.close .list ul li.last { background:none; }
                                .quickMenu.close .list ul li a { display:block; width:100%; height:20px; font-size:13px; color:#fff; margin-bottom:5px;}
                                .quickMenu.close .list ul li a span { display:inline-block; margin-top: 0px; line-height: 15px; }
                        
                                .quickMenu.close .list ul li.hid { display:block;}
                                .quickMenu.close .list ul li.hid a { display:block; width:100%; height:20px; font-size:13px; color:#fff; margin-bottom:5px;}
                                .quickMenu.close .list ul li.hid a span { display:inline-block; margin-top: 0px; line-height: 15px; }
                                
                                
                                .quickMenu.close .list ul li a.q1 { background:none; }
                                .quickMenu.close .list ul li a.q2 { background:none; }
                                .quickMenu.close .list ul li a.q3 { background:none; }
                                .quickMenu.close .list ul li a.q4 { background:none; }
                                .quickMenu.close .list ul li a.q5 { background:none; }
                                .quickMenu.close .list ul li a.q6 { background:none; }
                                .quickMenu.close .list ul li a.q7 { background:none; }
                                .quickMenu.close .list ul li a.q8 { background:none; }
                                .quickMenu.close .list ul li a.q9 { background:none; }
                                .quickMenu.close .list ul li a.q10 { background:none;}
                                .quickMenu.close .list ul li a.q11 { background:none; }
                                .quickMenu.close .list ul li a.q12 { background:none;}
                                .quickMenu.close .list ul li a.q12 span { margin-top:0px; }
                                .quickMenu.close .list ul li a.q13 { background:none; }
                                .quickMenu.close .list ul li a.q13 span { margin-top:0px; }
                                .quickMenu.close .list ul li a.q14 { background:none; }
                                .quickMenu.close .list ul li a.q14 span { margin-top:0px; }
                                .quickMenu.close .list ul li a.q15 { background:none; }
                                .quickMenu.close .list ul li a.q16 { background:none; }
                                
                                .quickMenu.close .quickClose { display:none; } 
                        
                        
                            /* quick open */
                            .mainImageInner .quickMenu.open { position:static; margin-left:0px; /*width:430px;*/ width:100%; height:auto; background:url("../images/quickMenuBg.png") repeat left top;}
                            .mainImageInner .quickMenu:after { content:""; display:block; clear:both; }
                                
                                
                                .quickMenu.open .btnOpen { position:static; display:block; }
                                .quickMenu.open .btnOpen img { display:none; }
                                .quickMenu.open .btnOpen .tit { display:block;  color:#fff; font-size:13px; margin-left:0px; height:40px; line-height:40px; text-align:center;}
                                .quickMenu.open .btnOpen .tit.flag { background: #041c31 url("../images/quickFlag2.png") no-repeat right 15px; }
                                .quickMenu.open .title { display:none; }
                                .quickMenu.open .list ul { margin-left:0px; margin-top:10px; }
                                .quickMenu.open .list ul li { float:none; background:none; text-align:left; margin-left:0px; width:100%;}
                                .quickMenu.open .list ul li.last { background:none; }
                                .quickMenu.open .list ul li a { display:inline-block; width:48%; height:20px; font-size:13px; color:#fff; margin-bottom:5px; padding-top:8px; padding-left:5px; margin-left:5px; border:1px solid #1d4f78; }
                                .quickMenu.open .list ul li a span { display:inline-block; margin-top: 0px; line-height: 15px; }
                        
                                .quickMenu.open .list ul li.hid { display:block; }
                                
                                
                                .quickMenu.open .list ul li a.q1 { background:none; }
                                .quickMenu.open .list ul li a.q2 { background:none; }
                                .quickMenu.open .list ul li a.q3 { background:none; }
                                .quickMenu.open .list ul li a.q4 { background:none; }
                                .quickMenu.open .list ul li a.q5 { background:none; }
                                .quickMenu.open .list ul li a.q6 { background:none; }
                                .quickMenu.open .list ul li a.q7 { background:none; }
                                .quickMenu.open .list ul li a.q8 { background:none; }
                                .quickMenu.open .list ul li a.q9 { background:none; }
                                .quickMenu.open .list ul li a.q10 { background:none;}
                                .quickMenu.open .list ul li a.q11 { background:none;}
                                .quickMenu.open .list ul li a.q12 { background:none;}
                                .quickMenu.open .list ul li a.q12 span { margin-top:0px; }
                                .quickMenu.open .list ul li a.q13 { background:none; }
                                .quickMenu.open .list ul li a.q13 span { margin-top:0px; }
                                .quickMenu.open .list ul li a.q14 { background:none; }
                                .quickMenu.open .list ul li a.q14 span { margin-top:0px; }
                                .quickMenu.open .list ul li a.q15 { background:none; }
                                .quickMenu.open .list ul li a.q16 { background:none; }
                                
                                .quickMenu.open .quickClose { display:none; } 
                        
                        
                        
                            /* newsArea  *******************************************************************************************************/
                            .newsArea { max-width:1160px; margin:0 auto; margin-top:47px;} 
                                .newsArea > div { float:left; width:93%;  border:1px solid #cfcfcf; height:auto; margin-left:20px; padding:35px 10px; }
                                .newsArea .news { margin-left:20px; }
                                .newsArea .pan { margin-top:40px; }
                                .newsArea .broad { margin-top:40px; }
                                .newsArea .titleBox:after { content:""; display:block; clear:both;   }
                                .newsArea .titleBox .boardName { float:left; font-size:18px; color:#e74e3f; max-width:270px; }
                                .newsArea .titleBox .more { float:right; }
                                
                                .newsArea .article { margin-top: 30px;}
                                    .newsArea .article .title { font-size:24px; font-weight:bold; color:#474747; line-height:28px;}
                                    .newsArea .article .summary { margin-top:10px; font-size: 16px; color:#595959; line-height:22px; }
                                    .newsArea .list .dotLine {  width:100%; height:11px; background:url("../images/dotLineBg.png") no-repeat right top;  margin:25px 0px; }
                                    .newsArea .list ul li { padding-bottom:10px; }
                                    .newsArea .list ul li a { color:#595959; font-size:14px; }
                                    .newsArea .list ul li .date { display:inline-block; float:right; color:#8e8e8e; font-size:14px;}
                        
                        
                            /* actionZone  *******************************************************************************************************/
                            .actionZoneOuter { width:100%; height:auto; background:url("../images/actionZoneBg.gif") repeat left top; margin-top:40px; padding:20px 0px;}
                        
                            .actionZone { max-width:1160px; margin:0 auto; margin-top: 20px; }
                            .actionZone:after { content:""; display:block; clear:both; }
                                .actionZone > div { width:90%; height:auto; margin-left:5%; }
                                
                                
                                .actionZone .searchCourt { background:url("../images/courtSearchBg.png") no-repeat center 110px;  height:410px; padding: 20px 10px 0px 10px; }
                                    .actionZone .searchCourt .title { height:85px; color:#3d3d3d; font-size:22px; text-align:center; background:url("../images/searchCourtTitleBg.png") no-repeat center top; line-height:140px;}
                                    .actionZone .searchCourt .description { height:120px; text-align:center; font-size:16px; color:#000000; margin-top:40px;  line-height:26px;} 
                                    .actionZone .searchCourt .courtForm { text-align:center; }
                                    .actionZone .searchCourt .selCap { background:#ffffff; border: 1px solid #cccccc; height:37px; vertical-align:top; padding:0px 3px; width:190px; }
                                    .actionZone .searchCourt .selCourt { background:#ffffff; border: 1px solid #cccccc; height:37px; vertical-align:top; padding:0px 3px; width:120px; vertical-align:top; margin-top:4px;}
                                    .actionZone .searchCourt .courtGo { display:inline-block; width:65px; height:35px; background:#871517; text-align:center; line-height:37px; color:#fff; font-size:14px; vertical-align:top;  margin-top:5px; }
                                
                                
                                .actionZone .searchIncident { margin-top:0px; padding:0px 0px; width:90%;}
                                .actionZone .searchIncident .myIncident { display:block;  float:left; margin-top:32px;  margin-right:3%; }
                                .actionZone .searchIncident img { width:100%;  }
                                .actionZone .searchIncident .formCollect { display:block; float:left; margin-top:32px; }
                                
                        
                                .actionZone .banner { padding:0px; background:#fff; border:1px solid #cfcfcf; margin-top:20px;}
                                    .actionZone .banner .titleBox { padding:0px 20px; margin-top:10px;}
                                    .actionZone .banner .titleBox:after { content:""; display:block; clear:both; }
                                    .actionZone .banner .titleBox .title { float:left; font-size:22px; color:#3d3d3d; padding-top:5px; }
                                    .actionZone .banner .titleBox .control { float:right;  }
                                    .actionZone .banner .titleBox .control .num { font-size:18px; color:#595959; vertical-align:top; padding-right:10px; line-height:30px;}
                                    
                                    .actionZone .banner .bannerBox { text-align:center; padding:5px 0px 14px 0px;}
                        
                            /* board  *******************************************************************************************************/
                            .board { max-width:1160px; margin:0 auto; margin-top: 20px; }
                            .board:after { content:""; display:block; clear:both; }
                                .board > div { width:90%; height:auto; padding:35px 10px; margin-left:5%; }
                                
                                
                                .prime .titlebox { border-bottom:1px solid #e0e0e0; padding-bottom:5px;}
                                .prime .titlebox:after { content:""; display:block; clear:both; }
                                .prime .titlebox .title  { float:left; font-size:22px; color:#3d3d3d; width:190px; }
                                .prime .titlebox .more { float:right; width:30px;}
                                .prime .article { margin-top:20px; background:#f5f5f5; padding:20px 10px; font-size:18px; color:#575757; line-height:26px; height:auto;}
                                .prime .article:after { content:""; display:block; clear:both; }
                                .prime .article .black { color:#000; }
                                .prime .article .date { display:block; float:right; font-size:16px; }
                                .prime .article .moreArticle { display:block; float:right; text-align:center;  width:78px; background:#871517; height:26px; padding:0 10px; margin-top:10px; font-size:12px; color:#fff;  }
                        
                                .courtNews .titlebox { border-bottom:1px solid #e0e0e0; padding-bottom:5px;}
                                .courtNews .titlebox:after { content:""; display:block; clear:both; }
                                .courtNews .titlebox .title  { float:left; font-size:22px; color:#3d3d3d; width:190px; }
                                .courtNews .titlebox .more { float:right; width:30px;}
                                .courtNews .article { height:420px;  line-height:26px; }
                                .courtNews .article:after { content:""; display:block; clear:both; }
                                .courtNews .article .photo { width:100%; margin:0 auto; margin-top:20px;}
                                .courtNews .article .photo img { width:100%; height:100%; }
                                .courtNews .article .textbox { margin-top:10px; }
                                .courtNews .article .textbox .title { float:left; font-size:18px; color:#000; }
                                .courtNews .article .textbox .date { float: right; font-size:14px; color:#646464; }
                                .courtNews .article .textbox .text { font-size:16px; color:#575757; clear:both; padding-top:5px;}
                                .courtNews .article .moreArticle { display:block; text-align:center;  width:78px; background:#871517; height:26px; padding:0 10px; margin-top:10px; font-size:12px; color:#fff;  }
                        
                                .newsletter { text-align:center; margin-top:5px; }
                        
                        
                            /* sub  **************************************************************************************************/
                        
                                /* lnb  */
                                .subContainer .lnb { display:none }
                                
                                /* content */
                                .subContainer .content { float:none;  width:96%; padding:0 2%; }
                                
                                
                                /* programBox */
                                .contentIn .programCon { text-align:left; }
                                .contentIn .programBox { position:relative; text-align:left; display:inline-block; border: 1px solid #b9b9b9; height: 300px; min-height:180px; width:30%; margin:0px 1%; margin-top:15px; }
                                .contentIn .programTitle01 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle01.jpg") right top no-repeat; }
                                .contentIn .programTitle02 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle02.jpg") right top no-repeat; }
                                .contentIn .programTitle03 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle03.jpg") right top no-repeat; }
                                .contentIn .programTitle04 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle04.jpg") right top no-repeat; }
                                .contentIn .programTitle05 { height:99px; line-height:99px; padding-left:10px; font-size:18px; color:#fff; background:url("../images/programTitle05.jpg") right top no-repeat; }
                                .contentIn .programBox .detailViewBtn { position:absolute; right:0px; bottom:0px;}
                                
                                
                                
                                
                        
                            /* footer  *******************************************************************************************************/
                            .footerOut .footerIn { max-width:1160px; margin:0 auto; padding-top:20px; clear:both;}
                            .footerOut .footerIn:after { content:""; display:block; clear:both; }
                            
                            .footerIn .footerLogo { float:left; width:190px; }
                            .footerIn .copybox { float:left; width:70%; }
                            .footerIn .certi { float:left; }
                            
                            /* copybox  */
                            .footerIn .copybox { margin-left:20px; }
                            .footerIn .copybox .footerLink:after { content:""; display:block; clear:both; }
                            .footerIn .copybox .footerLink ul li { float:left; }
                            .footerIn .copybox .footerLink ul li a { font-size:13px; color:#0d1820;}
                            .footerIn .copybox .footerLink ul li span { font-size:13px; color:#eee; padding: 0 10px; }
                        
                            .footerIn .copybox .address { font-size:12px; color:#0d1820; margin-top:10px;}
                            .footerIn .copybox .tel { font-size:12px; color:#0d1820;  margin-top:5px; }
                            .footerIn .copybox .copyright { font-size:12px; color:#0d1820; margin-top:2px; } 
                        
                            .footerIn .certi { display:none; }
                            .footerIn .certi img { margin-right:10px;  }
                            .footerIn .certi .selCou { background:#ffffff; border: 1px solid #cccccc; height:37px; vertical-align:top; padding:0px 3px; width:120px; vertical-align:top; margin-top:4px; }
                            .footerIn .certi .siteGo { display:inline-block; padding:0 5px; height:37px; background:#36536a; text-align:center; line-height:37px; color:#fff; font-size:14px; vertical-align:top;  margin-top:5px; margin-left:3px; }
                            
                        
                        }
                        
                        
                        
                        /*
* 시스템명 : 홈페이지사건검색(WSF)
* 파일명   : reset_safind.css
* 작  성  자 : 마정완
* 작성  일자 : 2016.11.24
* 처리  내용 : 홈페이지사건검색 CSS
* 버전  관리 : 2016.11.24 최초작성
*              [16A-SF-0052] [사건검색]홈페이지 개편에 따른 사건검색 개선(메인페이지) - 마정완
*              권성희, 2018.02.01 [18A-SF-0014] [사건검색]각급법원홈페이지 웹접근성 심사 관련 사건검색 1차 수정
*/
@charset "euc-kr";

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%; 
	vertical-align: middle;
}

caption { font-size:0px; }


input[type="checkbox"] { vertical-align:middle; margin-left:10px;}
input[type="radio"] { margin-left:10px; }

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	font-size: 12px;
	color: #666666;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a, a:link, a:visited, a:hover, a:active {
	text-decoration:none;
	color: #666666;
}
                        
                        
                        

                        </style>
                        <div class="contentIn">
                            ${content}
                        </div>
                        `
                    }} 
                    onLoad={() => console.log('loaded')}
                    onError={() => console.log('error')}
                    // containerStyle={{ marginTop: 20 }} 
                    style={this.props.style}
                    // injectedJavaScript={true}
                />
			</View>
		);
	}
}

export default WebViewInline;
