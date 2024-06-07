export default function Chips({ closeChips}) {

    return (
        <div className="absolute items-center justify-center flex top-0 left-0 right-0 bottom-1/4 sm:mt-14">
            <div className="bg-accent flex flex-col gap-2 text-center p-5 rounded-lg shadow-2xl animate-fade-up z-50">
                <h2 className="text-2xl bg-secondary rounded-lg font-bold">Chips</h2>
                <table className="">
                    <thead>
                        <th className="p-2">Value</th>
                        <th className="p-2">Quantity</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>20</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>50</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>100</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>500</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={closeChips} className="bg-gray-800/25 rounded-lg shadow-lg p-2">Close</button>
            </div>
        </div>
    )
}