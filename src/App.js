import React from "react";
import api from "./components/api";
import StateSelector from "./components/StateSelector";
import CountySelector from "./components/CountySelector";
import WebsiteList from "./components/WebsiteList";
import Spinner from "./components/Spinner";

class App extends React.Component {
  	state = {
		states: ["Pennsylvania", "Hawaii", "California"],
		selectedState: null,
		counties: [],
		selectedCounty: null,
		websites: [],
		selectedWebsites: [],
		loadingCounties: false,
		loadingWebsites: false,
  	};

  	onStateChange = (state) => {
    	this.loadCounties(state);
		this.setState({ selectedState: state });
		this.setState({ selectedCounty: [] });
		this.setState({ selectedWebsites: [] });
  	};

  	onCountyChange = (city) => {
    	this.loadWebsites(city);
		this.setState({ selectedCounty: city });
		this.setState({ selectedWebsites: [] });
	};
	  
	onWebsiteSelected = (websites) => {
		this.setState({ selectedWebsites: websites });
	}

	onWebsiteVisit = () => {
		this.state.selectedWebsites.forEach( site => {
			window.open("http://" + site);
		})
	}

	onAddState = (state) => {
		// @TODO: Validate the state
		let currentStates = this.state.states;
		currentStates.push(state);
		this.setState({ states: currentStates });
	}

  	loadCounties = async (state) => {
		this.setState({ loadingCounties: true });
		
    	await api.get(`/gaba-ops/by-state`, {
      		params: {
        		stateName: state,
        		codesOnly: 1,
      		}
    	}).then( response => {
			const counties = this.parseCounties(response.data);
    		this.setState({ counties: counties });
		}).catch( err => {
			console.log(err);
			this.setState({ counties: [] });
		}).finally( () => {
			this.setState({ loadingCounties: false });
		});
    
  	};

 	loadWebsites = async (city) => {
		this.setState({ loadingWebsites: true });

		await api.get(`/comp-pool-ops/active-business-websites`, {
			params: {
			marketCode: "Health;Dentists",
			gabaCode: city,
			},
		})
		.then((response) => {
			const websites = response.data.data.domains.sort().slice(0, 5);
			this.setState({ websites: websites });
		})
		.catch((err) => {
			console.log(err);
			this.setState({ websites: [] });
		}).finally( () => {
			this.setState({ loadingWebsites: false });
		});
  	};

 	parseCounties(data) {

		return data.filter((item) => {
			if (item.includes("US;city", item)) {
				return true;
			}
			return false;
		})
		.map((item) => {
			const split = item.split("_");
			const city = split[1].replace(" County", "");
			const county = split[2];
			const option = city + " (" + county + ")";
			return { label: option, value: item };
		});
  	}

	render() {
		return (
			<div className="container p-4">
				<div className="row">
					<div className="col-sm p-3">
						<StateSelector
						states={this.state.states}
						onStateChange={this.onStateChange}
						onAddState={this.onAddState}
						/>
					</div>
					<div className="col-sm p-3 text-center">
						{ this.state.loadingCounties
							? <Spinner />
							: <CountySelector counties={this.state.counties} onCountyChange={this.onCountyChange} />
						}
						
					</div>
					<div className="col-sm p-3 text-center">
						{ this.state.loadingWebsites
							? <Spinner />
							: <WebsiteList websites={this.state.websites} onWebsiteSelected={this.onWebsiteSelected} onWebsiteVisit={this.onWebsiteVisit} />
						}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
