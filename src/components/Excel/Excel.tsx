import React from 'react';
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"
import './excel.scss'
interface Props{

}
function Excel(props:Props) {
    return (
        <div className='excel'>
           <Workbook data={[{ name: "Sheet1" }]}   />
        </div>
    );
}

export default Excel;