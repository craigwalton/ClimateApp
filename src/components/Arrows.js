export const headStep = 10;

export const SvgDefs = ({id, start, end}) => (
    <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={start}/>
            <stop offset="100%" className={end}/>
        </linearGradient>
    </defs>
);
