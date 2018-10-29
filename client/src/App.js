import React, { Component } from 'react';
import './App.css';
import { Input, Button, List, Upload, Icon } from 'antd';
import 'antd/dist/antd.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "",
      files: [
        {title: "Tom.txt"},
        {title: "AnImportantDoc.txt"},
        {title: "OsuSong.osk"},
        {title: "osuSkin.osk"},
        {title: "HelloWorld.py"}
      ],
    }
  }

  componentDidMount() {
  }

  handleGenerate() {
    fetch('/generate').then(res => res.text()).then(key => this.setState({key}));
  }

  render() {

    return (
      <div className="container">
        Generate a key to start uploading
        <div className="button">
          <p className="key">{this.state.key}</p>
          <Button type="default" onClick={this.handleGenerate.bind(this)} >Generate Key</Button>
        </div>
        <div className="inputs">
          <Input.Search placeholder="Key" style={{ width:500 }}/>
        </div>
        {
          this.state.key !== "" &&
          <div>
            <p>
              Current Session: {this.state.key}
            </p>
            <p>
              <Upload>
                <Button>
                  <Icon type="upload"/> Select File
                </Button>
              </Upload>
            </p>
          </div>
        }
        <List itemLayout="horizontal" dataSource={this.state.files} renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
              />
          </List.Item>
          )}
        />
      </div>
    );
  }
}

export default App;
