import React, { Component } from 'react';
import { Input, Button, List, Upload, Icon } from 'antd';
import './App.css';
import 'antd/dist/antd.css'
const download = require("downloadjs");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "",
      searchValue:"",
      files: [],
    }
  }

  componentDidMount() {
  }

  handleGenerate() {
    fetch('/generate').then(res => res.text()).then(key => this.setState({key}));
  }

  handleValueChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleSearch() {
    fetch(`/${this.state.searchValue}`).then(res => res.json()).then(files => this.setState({files}));
  }

  async handleDownload(keyPrefix,keyOriginal) {
    fetch(`/file/${keyPrefix}/${keyOriginal}`).then(res => res.blob()).then(blob => download(blob,keyOriginal));
    // let routeName = `/file/${keyPrefix}/${keyOriginal}`;
    // console.log('CALLED DOWNLOAD?? TO THIS ROUTE--------->', routeName);
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
          <Input.Search
            placeholder="Key"
            style={{ width:500 }}
            onChange={ this.handleValueChange.bind(this) }
            onSearch={ this.handleSearch.bind(this) }
          />
        </div>
        {
          this.state.key !== "" &&
          <div>
            <p>
              Current Session: {this.state.key}
            </p>
            <p>
              <Upload action='/upload'>
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
                title={<Button onClick={() => this.handleDownload(item.Key.substr(0,10),item.Key.substr(11,item.Key.length))} type='dashed'> {item.Key.substr(11,item.Key.length)} </Button> }
              />
          </List.Item>
          )}
        />
      </div>
    );
  }
}

export default App;
