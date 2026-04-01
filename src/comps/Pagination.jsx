import useStore from '../data/store'
export default function Pagination() {
    const {mypage, setPage, maxpages} = useStore()
    return (
    <div className="pagination">
        <button disabled={mypage === 1} onClick={() => setPage(false)}>Prev</button>
        {/* <ul>
        {Array.from({ length: maxpages }, (_, index) => (
            <li className="page" key={index}>{index}</li>
        ))}
        </ul> */}
        <button onClick={() => setPage(true)} disabled={mypage === maxpages}>Next</button>
    </div>
    )
}