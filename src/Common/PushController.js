import React from "react";
import PushNotification from "react-native-push-notification";

export default class PushController extends React.Component {
    componentDidMount() {
        PushNotification.configure({
            onNotification: function(notification) {
                console.log("NOTIFICATION:", notification)
            }
        });
    }

    render() {
        return null
    }
    
}
