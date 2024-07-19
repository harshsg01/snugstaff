
import { LineChart } from "@mui/x-charts/LineChart";

export const LineChats = () => {


    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    return (
        <LineChart
            Axis={[{ data: [1, 2, 3, 5, 6, 7, 8, 9, 10] }]}
            series={[
                {
                    data: data,
                    color: "#d5d5d5",
                },
            ]}
            height={300}
        />
    )
}