import { StyleSheet, Platform } from 'react-native';
import * as defaultStyle from '../../../style';
export default function styleConstructor(theme = {}) {
    const appStyle = { ...defaultStyle, ...theme };
    return StyleSheet.create({
        container: {
            alignSelf: 'stretch',
            alignItems: 'center',
        },
        base: {
            width: 22,
            height: 22,
            alignItems: 'center',
            // backgroundColor: 'green'  // 2021-10-30 JY
        },
        text: {
            marginTop: Platform.OS === 'android' ? 0 : 3,  // 2021-10-30 JY
            fontSize: appStyle.textDayFontSize,
            fontFamily: appStyle.textDayFontFamily,
            fontWeight: appStyle.textDayFontWeight,
            color: appStyle.dayTextColor,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            ...appStyle.textDayStyle
        },
        alignedText: {
            marginTop: Platform.OS === 'android' ? 0 : 3  // 2021-10-30 JY
        },
        selected: {
            backgroundColor: appStyle.selectedDayBackgroundColor,
            borderRadius: 16
        },
        today: {
            backgroundColor: appStyle.todayBackgroundColor,
            borderRadius: 16
        },
        todayText: {
            color: appStyle.todayTextColor
        },
        selectedText: {
            color: appStyle.selectedDayTextColor
        },
        disabledText: {
            color: appStyle.textDisabledColor
        },
        inactiveText: {
            color: appStyle.textInactiveColor
        },
        dot: {
            width: 4,
            height: 4,
            marginTop: 1,
            borderRadius: 2,
            opacity: 0,
            ...appStyle.dotStyle
        },
        visibleDot: {
            opacity: 1,
            backgroundColor: appStyle.dotColor
        },
        selectedDot: {
            backgroundColor: appStyle.selectedDotColor
        },
        disabledDot: {
            backgroundColor: appStyle.disabledDotColor || appStyle.dotColor
        },
        todayDot: {
            backgroundColor: appStyle.todayDotColor || appStyle.dotColor
        },
        ...(theme.stylesheet?.day?.basic || {})
    });
}
