import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Portal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    setPortalToLocal(portal) {
        let { portal_id, portal_name, portal_desc, portal_categories, portal_background, portal_explict, subportals, author_name } = portal;
        let data = {
            portalName: portal_name,
            portalDescription: portal_desc,
            portalCategory: portal_categories.split(","),
            portalExplict: portal_explict,
            authorName: author_name
        };
        localStorage.setItem('editMode', true);
        localStorage.setItem('editID', portal_id);
        localStorage.setItem('mainPortal', JSON.stringify(data));
        localStorage.setItem('portalBackground', `http://${portal_background}`)
        let subportals_data = [];
        subportals.map((item) => {
            let { subportal_category, subportal_icon, subportal_source, playlists } = item;
            let temp = {
                portalCategory: subportal_category,
                portalSource: subportal_source,
                portalTile: `http://${subportal_icon}`
            };
            let plays = [];
            playlists.map((item) => {
                let { play_name, play_source, play_image, play_tags } = item;
                let play_temp = {
                    name: play_name,
                    source: play_source,
                    icon: `http://${play_image}`,
                    tags: play_tags.split(",")
                }
                plays.push(play_temp);
            });
            temp.playlists = plays;
            subportals_data.push(temp);
        });
        localStorage.setItem('portals', JSON.stringify(subportals_data));

        this.setState({ redirect: true });
    }

    render() {
        let { portal_id, portal_name, portal_background, portal_desc } = this.props.item;
        if (this.state.redirect) {
            return <Redirect to="/portalGenerator" />;
        }
        return (
            <div key={portal_id} style={{ padding: 10 }} className="mx-auto">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={'http://' + portal_background} alt="background" />
                    <Card.Body>
                        <Card.Title>
                            { portal_name }
                        </Card.Title>
                        <Card.Text>
                            { portal_desc }
                        </Card.Text>
                        <Button variant="primary" onClick={e => this.setPortalToLocal(this.props.item)}>Edit</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default Portal;