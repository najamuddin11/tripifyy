import React, { Component } from 'react';
import CreateAgencyProfile from '../../components/agency/profile/CreateAgencyProfile';
import AgencyHeader from '../../components/header/AgencyHeader';

class CreateAgencyProfileRoute extends Component {
    render() {
        return (
          <div>
            <AgencyHeader />
            <CreateAgencyProfile/>
          </div>
        );
    }
}

export default CreateAgencyProfileRoute;
