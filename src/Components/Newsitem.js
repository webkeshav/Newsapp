import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
      let {title,description,imageurl,newsurl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        <img src={!imageurl?"https://cdn.vox-cdn.com/thumbor/zNWkJCpbCysQCHjPFJGfJ10m6wE=/0x130:2560x1470/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23606365/LG_OLED_Objet_Collection_POSE_PR_1.jpg":imageurl} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
