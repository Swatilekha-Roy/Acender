import { SwipeableDrawer } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import TinderCard from "react-tinder-card";
import './TinderCards.css';
import axios from './axios';

function TinderCards() {
    const [people, setPeople] = useState([
        /*{
            name: "Noodle Boop",
            url: "https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816_960_720.jpg"
        },
        {
            name: "Poodle Boop",
            url: "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_960_720.jpg"
        },
        {
            name: "Doodle Boop",
            url: "https://cdn.pixabay.com/photo/2016/01/19/17/41/friends-1149841_960_720.jpg"
        },
        {
            name: "Woodle Boop",
            url: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_960_720.jpg"
        },
        {
            name: "Goodle Boop",
            url: "https://cdn.pixabay.com/photo/2015/11/17/13/13/bulldog-1047518_960_720.jpg"
        },*/
    ]);

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get('/acender/cards');

            setPeople(req.data);
        }

        fetchData();
    }, []);

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
        //setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    }

    return (
        <div className="tinderCards">
            <div className="tinderCards_cardContainer">
            {people.map((person) => (
                <TinderCard
                    className="swipe"
                    key={person.name}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => swiped(dir, person.name)}
                    onCardLeftScreen={() => outOfFrame(person.name)}>


                        <div style={{ backgroundImage: `url(${person.imgUrl})` }}
                            className="card">
                                <h3>{person.name}</h3>
                            </div>
                </TinderCard>
            ))}
            </div>        
    </div>
    );
}

export default TinderCards;
