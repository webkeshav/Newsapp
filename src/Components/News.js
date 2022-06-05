import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country : "in",
        pageSize : 8,
        category : "general"
    }

    static propTypes ={
        country: PropTypes.string,
        pageSize : PropTypes.number,
        category: PropTypes.string,
    }


    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=19f57aa98cc841dda3cd5c709e495e2e&page=${this.state.page}&pagesize=${this.props.pageSize}`
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            article : parsedData.articles,
            totalResults : parsedData.totalResults,
            loading : false
        })
    }
    constructor(props){
        super(props);
        console.log("Hello I am a constructor from news component");
        this.state = {
            article : [],
            loading :false,
            page : 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
    }

    async componentDidMount(){
        this.updateNews();
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      
    handlePrevClick = async () => {
        this.setState({page:this.state.page-1});
        this.updateNews();

    }


    handleNextClick  = async () => {
    this.setState({page:this.state.page-1});
    this.updateNews();

    }



  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center my-3'>News Monkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines .</h1>
        {this.state.loading && <Spinner />}
        <div className='row'>
            {!this.state.loading && this.state.article.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl ={element.url} author={element.author} date ={element.publishedAt} source={element.source.name}/>
                </div>
            })}
        
        </div>
        <div className='container my-3 d-flex justify-content-between'>
        <button type="button" disabled={this.state.page <=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
