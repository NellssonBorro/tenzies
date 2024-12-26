
export default function Dice(props){
    // console.log(props.val.isHeld)/ 
    const look = props.isHeld? "bg-green-500":""
    // function
    return(
        <div onClick={props.hold} className={`dice ${look}`}>{props.val}</div>
    )
}