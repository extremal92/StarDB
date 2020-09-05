import React, { Component } from 'react';
import './people-page.css'
import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row/row';
import ErrorBoundry from '../error-boundry/error-boundry';


export default class PeoplePage extends Component {

    swapiService = new SwapiService;
    
    state = {
        selectedPerson: 3,
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({
          selectedPerson
        });
    };

    render(){

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const itemList = (
            <ErrorBoundry>
                <ItemList 
                    onItemSelected={this.onPersonSelected}
                    getData={this.swapiService.getAllPeople}>
                    {/* renderItem={({name, gender, birthYear}) => (
                        `${name}  ( ${ gender },  ${ birthYear } )`)} */}
                        {(i) => (
                            `${i.name}  ( ${ i.gender },  ${ i.birthYear } )`
                        )}
                </ItemList>
            </ErrorBoundry>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails personId={this.state.selectedPerson} />
            </ErrorBoundry>
        )

        return(
            <ErrorBoundry>
                <Row left={itemList} right={personDetails} />
            </ErrorBoundry>
        )
    }
}

