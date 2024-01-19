import React, { Component } from 'react';
import './image-schedule-widget.css';
import globalSatCat from '../../../store/sat-cat-data/sat-cat-data';

export class ImageScheduleWidget extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
      validTargets: listValidTargets()
    };
  }

  render() {
    return (
      <div>
        <table id="img-table">
          <tbody>
            <tr>
              <td>Date</td>
              <td>Time</td>
              <td>Target</td>
              <td>Camera</td>
              <td></td>
            </tr>
            {this.state.imgs.map((img, index) => (
              <tr key={index}>
                <td>{img.date}</td>
                <td>{img.time}</td>
                <td>{img.target}</td>
                <td>{img.camera}</td>
                <td>
                  <
                    img 
                    src={require('../../../assets/action-icons/cancel-icon/cancel-icon.png')} 
                    alt="Cancel" id="cancel" 
                    onClick={() => this.handleDeleteButtonClick(index)}
                  ></img>
                </td>
              </tr>
            ))}
            <tr>
              <td><input type="date" id="img-date"/></td>
              <td><input type="time" id="img-time" step="1" min="00:00:00" max="23:59:59"/></td>
              <td>
                <select id="img-tgt">
                  {this.state.validTargets.map((target, index) => (
                    <option key={index} value={target}>{target}</option>
                  ))}
                </select>
              </td>
              <td>
                <select id="img-cam">
                  <option value="NFOV">NFOV</option>
                  <option value="WFOV">WFOV</option>
                </select>
              </td>
              <td><button onClick={this.handleAddButtonClick} id="add-img-button">Add</button></td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleExportButtonClick} id="export-button">Export to JSON</button>
      </div>
    );
  }

  handleAddButtonClick = () => {
    this.setState({
      imgs: this.state.imgs.concat([{
        date: document.getElementById("img-date").value,
        time: document.getElementById("img-time").value,
        target: document.getElementById("img-tgt").value,
        camera: document.getElementById("img-cam").value
      }])
    });
  }

  handleDeleteButtonClick = (index) => {
    this.setState({
      imgs: this.state.imgs.filter((_, i) => i !== index)
    });
  }
}

async function handleExportButtonClick() {
  const saveFileOptions = {
    types: [
      {
        description: 'JSON',
        accept: {
          'application/json': ['.json'],
        },
      },
    ],
  };
  const fileHandle = await window.showSaveFilePicker(saveFileOptions);
  const writable = await fileHandle.createWritable();
  let imgs = [];
  for (let i = 1; i < document.getElementById("img-table").rows.length-1; i++) {
    imgs.push({
      date: document.getElementById("img-table").rows[i].cells[0].innerHTML,
      time: document.getElementById("img-table").rows[i].cells[1].innerHTML,
      target: document.getElementById("img-table").rows[i].cells[2].innerHTML,
      camera: document.getElementById("img-table").rows[i].cells[3].innerHTML
    });
  }
  await writable.write(JSON.stringify(imgs));
  await writable.close();
}

function listValidTargets() {
  let validTargets = [];
  const targetIndices = JSON.parse(window.localStorage.getItem('activeSatellites'));
  targetIndices.forEach((index) => {
    validTargets.push(globalSatCat[index].OBJECT_NAME);
  });
  return validTargets;
}