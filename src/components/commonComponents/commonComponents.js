export const Input = (props) => {
    return <input type={props.type} className={props.css} placeholder={props.placeholder} onChange={() => props.onChange(e)} value={props.value} />
}

export const Button = (props) => {
    return <button type={props.type} className={props.css} onClick={props.onClick}>{props.label}</button>
}