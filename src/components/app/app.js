import React, {Component} from 'react'
import './app.css'
import Header from '../header/header'
import ItemList from '../item-list/item-list'
import ItemDetails from '../item-details/item-details'
import RandomPlanet from '../random-planet/random-planet'
import ErrorButton from '../error-button/error-button'
import ErrorIndicator from '../error-indicator/error-indicator'
import PeoplePage from '../people-page/people-page'
import SwapiService from '../../services/swapi-service'
import ErrorBoundry from '../error-boundry/error-boundry'
import Row from '../row/row'

export default class App extends Component {

    swapiService = new SwapiService

    state = {
      showRandomPlanet: true,
      hasError: false,
    };
  
    toggleRandomPlanet = () => {
      this.setState((state) => {
        return {
          showRandomPlanet: !state.showRandomPlanet
        }
      });
    };

    componentDidCatch() {
      this.setState({ hasError: true });
    }
  
    render() {

      if (this.state.hasError) {
        return <ErrorIndicator />
      }
  
      const planet = this.state.showRandomPlanet ?
        <RandomPlanet/> :
        null;

      const { getPerson, 
              getStarship, 
              getPersonImage,
              getStarshipImage } = this.swapiService;

      const personDetails = (
        <ItemDetails 
          itemId={11}
          getData={getPerson}
          getImageUrl={getPersonImage}/>
      )

      const starshipDetails = (
        <ItemDetails 
          itemId={5}
          getData={getStarship}
          getImageUrl={getStarshipImage}/>
      )
  
      return (
        <ErrorBoundry>
          <div className='container stardb-app'>
            <Header />
            {/* { planet }

            <div className='row mb2 button-row'>
              <button
                className='toggle-planet btn btn-warning btn-lg'
                onClick={this.toggleRandomPlanet}>
                Toggle Random Planet
              </button>

              <ErrorButton />
            </div> */}

            {/* <PeoplePage /> */}

            <Row 
              left={personDetails}
              right={starshipDetails}
            />




            {/* <div className='row mb2'>
                <div className='col-md-6'>
                    <ItemList 
                          onItemSelected={this.onPersonSelected}
                          getData={this.swapiService.getAllPlanets} 
                          renderItem={(item) => item.name}/>
                </div>
                <div className='col-md-6'>
                    <PersonDetails personId={this.state.selectedPerson} />
                </div>
            </div>
            
            <div className='row mb2'>
                <div className='col-md-6'>
                    <ItemList 
                          onItemSelected={this.onPersonSelected}
                          getData={this.swapiService.getAllStarships}
                          renderItem={(item) => item.name} />
                </div>
                <div className='col-md-6'>
                    <PersonDetails personId={this.state.selectedPerson} />
                </div>
            </div> */}

          </div>
        </ErrorBoundry>
        );
    }
}