import React from 'react';
import { Chart } from 'react-google-charts'

export default function ProgressBarSalary({ bar1, bar2, bar3 }) {
    return (
        <div className={`col s6`}>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Salary', 'Percentage'],
                    ['Desconto INSS', bar1],
                    ['Desconto IRPF', bar2],
                    ['Salário líquido', bar3],
                ]}
                options={{
                    title: 'Descontos e salário líquido',
                    colors: ['#e67e22', '#c0392b', '#16a085']
                }}
            />
        </div>
    )
}