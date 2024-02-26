import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getActivitiesByAddress,
  addActivitiesToMongo,
  getSavedActivities,
} from "../../actions/activitiesActions";
import M from "materialize-css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const moment = require("moment"); // require

class SearchActivity extends Component {
  state = {
    searchTerm: "",
    startDate: new Date(),
    endDate: new Date(),
  };
  componentDidMount() {
    this.props.getSavedActivities(this.props.auth.user.id);
  }

  handleSearchEvent = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };
  isPast = (date) => {
    const day = new Date();
    return day < date;
  };
  renderResult = (state) => {
    if (state.default) {
      return <div>{state.default}</div>;
    } else if (state.length === 0) {
      return <div>No information found</div>;
    } else {
      //map thru every event in the array
      return this.props.activities.activities.map((item, id) => {
        //create a unique key for each event
        const key = id;
        return (
          <div key={key}>
            <ul className="container">
              {/* event name */}
              <li>
                <a target="_blank" href={`${item.event_site_url}`}>
                  {item.name}
                </a>
              </li>
              {/* event description */}
              <li>{item.description}</li>
              {/* event location */}
              <li>{`Location: ${item.location.address1} ${item.location.city} ${item.location.state} ${item.location.zip_code}`}</li>
              {/* event cost */}
              <li>
                cost:{" "}
                {item.is_free
                  ? "free event"
                  : `$ ${item.cost === null ? `to be announced` : item.cost}`}
              </li>
              {/* start date */}
              <li>
                Start Date: {moment(item.time_start).format("MM-DD-YYYY")}
              </li>
              {/* end date */}

              <li>
                {" "}
                End Date:{" "}
                {item.time_end === null
                  ? "not available"
                  : moment(item.time_end).format("MM-DD-YYYY")}
              </li>
              {/* button to save */}
              {!this.props.activities.selectedActivities.includes(key) ? (
                <button
                  id={key}
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={(event) => {
                    event.preventDefault();

                    //ADD THE USER to the activities data so mongoose can locate the user based on _userID
                    item.user = this.props.auth.user.id;
                    item.key = key;
                    console.log(
                      "this come from line 80 of SearchActivity.js to console.log data to be send to mongo from the front end react",
                      item
                    );
                    this.props.addActivitiesToMongo(item);
                    M.toast({
                      html: "Successfully added to planner",
                      class: "toast",
                    });
                  }}
                >
                  Add to Planner
                  <i className="material-icons right">send</i>
                </button>
              ) : (
                <div></div>
              )}
            </ul>
            <br></br>
            <br></br>
          </div>
        );
      });
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col s12 center-align">
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <Link
                  to="/hotel"
                  className="btn btn-large hoverable accent-3"
                  style={{
                    marginRight: 10,
                    background: "#f9bc60",
                    color: "#001e1d",
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    background: "#f9bc60",
                    color: "#001e1d",
                  }}
                >
                  HOTELS
                </Link>
                <Link
                  to="/flights"
                  className="btn btn-large hoverable accent-3"
                  style={{
                    marginRight: 10,
                    background: "#f9bc60",
                    color: "#001e1d",
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    background: "#f9bc60",
                    color: "#001e1d",
                  }}
                >
                  FLIGHTS
                </Link>
                {/* <Link
                  to="/rental"
                  className="btn btn-large hoverable black accent-3"
                  style={{
                    marginRight: 10,
                  }}
                >
                  RENTAL CARS
                </Link> */}
                <Link
                  to="/activity"
                  className="btn btn-large hoverable accent-3"
                  style={{
                    background: "#f9bc60",
                    color: "#001e1d",
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    background: "#f9bc60",
                    color: "#001e1d",
                  }}
                >
                  ACTIVITIES
                </Link>
                <br />
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    console.log("form submitted");
                    this.props.getActivitiesByAddress(this.state);
                  }}
                >
                  <input
                    onChange={this.handleSearchEvent}
                    value={this.state.searchTerm}
                    name="activitiesSearch"
                    type="text"
                    className="address"
                    placeholder="Search an address or city for fun events to do!!!"
                  ></input>
                  <br></br>
                  <DatePicker
                    className="startDate"
                    timeInputLabel="When do you want this adventure to start?"
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    filterDate={this.isPast}
                    onChange={(date) =>
                      this.setState({ ...this.state, startDate: date })
                    }
                  />
                  <br />
                  <DatePicker
                    className="endDate"
                    timeInputLabel="When do you want this adventure to start?"
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    filterDate={this.isPast}
                    onChange={(date) =>
                      this.setState({ ...this.state, endDate: date })
                    }
                  />
                  <br />
                  <button
                    type="submit"
                    className="Search btn btn-large hoverable blue accent-3"
                  >
                    Search{" "}
                  </button>
                </form>
              </div>
              <div className="card-content">
                {this.renderResult(this.props.activities.activities)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SearchActivity.propTypes = {
  getActivitiesByAddress: PropTypes.func.isRequired,
  addActivitiesToMongo: PropTypes.func.isRequired,
  activities: PropTypes.object,
  selectedActivities: PropTypes.array,
  getSavedActivities: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  activities: state.activities,
});

export default connect(mapStateToProps, {
  getActivitiesByAddress,
  addActivitiesToMongo,
  getSavedActivities,
})(SearchActivity);
