import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import renderChart from './renderChart';
import echarts from './echarts.min';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.setNewOption = this.setNewOption.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  setNewOption(option) {
    this.refs.chart.postMessage(JSON.stringify(option));
  }

  render() {
    let { tplurl } = this.props
    let html = `<!DOCTYPE html>
    <html>
      <head>
        <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"> 
        <title>echarts</title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <style type="text/css">
          html,body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          #main {
            height: 100%;
          }
        </style>
        <script src="https://cdn.bootcss.com/echarts/4.3.0/echarts.min.js"></script>
      </head>
      
      <body>
        <div id="main"></div>
      <body>
    <html>
    `
    const source = tplurl?{ 'uri': tplurl }:{html}
    return (
      <View style={{ flex: 1, height: this.props.height || 400, }}>
        <WebView
          ref="chart"
          scrollEnabled={false}
          injectedJavaScript={renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          scalesPageToFit={Platform.OS !== 'ios'}
          originWhitelist={['*']}
          source={source}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}