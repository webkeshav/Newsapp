import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    constructor(){
        super();
        console.log("Hello I am a constructor from news component");
        this.state = {
            article : [],
            loading : false,
            page : 1
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=19f57aa98cc841dda3cd5c709e495e2e&page=1&pagesize=20"
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            article : parsedData.articles,
            totalResults : parsedData.totalResults
        })
    }

    handlePrevClick = async () => {
    
        let url =  `https://newsapi.org/v2/top-headlines?country=us&apiKey=19f57aa98cc841dda3cd5c709e495e2e&page=${this.state.page -1}&pagesize=20`
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            article : parsedData.articles,
            page : this.state.page-1
        })

    }


    handleNextClick  = async () => {
        if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

        }
        else{
        let url =  `https://newsapi.org/v2/top-headlines?country=us&apiKey=19f57aa98cc841dda3cd5c709e495e2e&page=${this.state.page +1}&pagesize=20`
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            article : parsedData.articles,
            page : this.state.page+1 
    })

    }
}


  render() {
    return (
      <div className='container my-3'>
        <h1>this is a news Component.</h1>
        <div className='row'>
            {this.state.article.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl ={element.url}/>
                </div>
            })}
        
        </div>
        <div className='container my-3 d-flex justify-content-between'>
        <button type="button" disabled={this.state.page <=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
