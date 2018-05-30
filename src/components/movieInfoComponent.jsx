import React, { Component } from 'react';
import axios from 'axios'
import './style.css'

// Header Container
const HeaderContainer = props => (
  <div className="top-container">
    <div className="logo"> 
      <h1>Review</h1>
    </div>
    <div className="busca">
      <input type="text" />
      <button className="botao-busca">Procurar</button>
    </div>
    <div className="general-info">
      <b>Total de Filmes: </b>
      <span> {props.totalMovies}</span>
    </div>  
  </div>
)

// MovieCover usado para listar os filmes, onde o mesmo será um link para acessar os detalhes do filme.
class MovieCover extends Component {
  render(){
    return(
      <div>
        <img className="movie-cover" 
          src={this.props.movie.medium_cover_image} 
          alt="Carregar Mais..."
          title={this.props.movie.title} />
      </div>
    )
  }
}


// Quando o usuário clicar em um filme (movieCover) ele verá os detalhes do filme organizados nesse compoente, que ainda não está sendo usado.
class MovieInfo extends Component {
  render(){
    return(
      <div className="movie-info">
        <div className="movie-info-header"> 
          {this.props.movie.title}
        </div>
        <div className="movie-info-body"> 
          <p> 
          {this.props.movie.synopsis}
          </p>
        </div>
        <div className="movie-info-footer"> 
        </div>
      </div>
    )
  }
}


//Container Principal que será usado como base da lista de filmes
export default class MovieContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movieList: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getMovieList();
    this.setState({loading:false})
  } 

  
  render() {
    return (
      <div>
        <HeaderContainer totalMovies ={ this.state.movieList.length } />

        <div className="movie-container loader">
            {
              this.state.movieList.map(movie => {
                return(
                  <MovieCover key={movie.id} movie={movie} />
                )
              })
            }
        </div>
      </div>
    );
  }

  
  getMovieList() {
    axios.get('https://yts.am/api/v2/list_movies.json')
    .then(res => {
        const movies = res.data
        this.setState({movieList: movies.data.movies})
    })
  }

  getMovieByTitle(event) {
    axios.get('https://yts.am/api/v2/list_movies.json')
    .then(res => {
        const movies = res.data
        this.setState({movieList: movies.data.movies})
    })  
  }
}

