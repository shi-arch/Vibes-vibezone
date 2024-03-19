export const Input = (props) => {
    return <input type={props.type} className={props.className} placeholder={props.placeholder} onChange={(e) => props.onChange(e.target.value)} value={props.value} />
}

export const Button = (props) => {
    return <button type={props.type} className={props.css} onClick={props.onClick()}>{props.label}</button>
}