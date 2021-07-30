
import "../styles/offline.css";

import {
    WarningOutlined,
} from '@ant-design/icons';

export const AppOffline = () =>{

  
    
    return <div className="AppOffline">

        <div className="AppOfflineCardContainer">


            <div style={{ marginBottom: 30}}>API is not accessable. Please try again later.</div>

            <WarningOutlined style={{ fontSize: '96px' }} />

        </div>
        


    </div>



}