import './Styles/FileInput.css'
export default function(props){

    const handleClick=(e)=>{
        e.preventDefault();        
    }

    return (<div>        
        <label htmlFor="getFile" class="button-label">{props.text}</label>
        <input  type='file' id="getFile" onChange={props.onChange} hidden></input>        
    </div>)
}