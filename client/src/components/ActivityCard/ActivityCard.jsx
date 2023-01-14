import { Component } from "react";
import styles from "./activityCard.module.css";
import {DIFFICULTIES} from '../../redux/actions/constants';

export default class ActivityCard extends Component {

    constructor(props) {
        super(props);
        this.id = props.id;
        this.name = props.name;
        this.duration = props.duration;
        this.season = props.season;
        if  (props.difficulty <= DIFFICULTIES.length + 1)
            this.difficulty = DIFFICULTIES[props.difficulty-1];
        else    
            this.difficulty = 'not exist';
    }

    render () {
        return (
            <div className={styles.cardActivity}>
                <h5>{this.name}</h5>
                <p>It is {this.difficulty}</p>
                <p>Duration is {this.duration}</p>
                <p>It is done in {this.season}</p>
            </div>
        )
    }
}