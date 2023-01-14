import styles from "./landingPage.module.css";
import { Component } from "react";
import { Link } from 'react-router-dom';
import { getCountries } from "../../redux/actions";
import { connect } from "react-redux";

export class LandingPage extends Component {

    componentDidMount() {
        this.props.getCountries();        
    }

    render() {
        return (
            <div className = { styles.landing }>
               <h1 className = { styles.welcome }>Welcome to Henry Countries App</h1>
               <Link className = { styles.link }to ='/home'>
                   <button className = { styles.lightbutton }>Enter</button> 
               </Link>                  
            </div>
        )
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
      getCountries: () => dispatch(getCountries())
    }
};
  
export default connect(null, mapDispatchToProps)(LandingPage);
  