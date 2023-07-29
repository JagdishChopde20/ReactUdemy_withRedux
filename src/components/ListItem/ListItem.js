import './ListItem.css';
import Card from '../UI/Card/Card';

function ListItem(props) {
    return (
        <li className='list-item' onClick={props.onClick}>
            <Card>
                <div className='list-item-flex'>
                    <span>{props.item.name}</span>
                    <span>
                        <span style={{ color: 'orange' }}>&#9733; </span>
                        {Number(props.item.rating).toFixed(1)}
                    </span>
                </div>

            </Card>
        </li>
    )
}

export default ListItem;