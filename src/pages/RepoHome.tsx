import { PageHeader, Skeleton, Space, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState  } from "../store/store";
import { apiClient } from "../utils/api";
import { RepoInfo } from "../schemas/RepoInfo";
import { useRef } from "react";

export const RepoHome = () =>{
    const { moduleId } = useParams<{moduleId : string}>()
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState<any[]>();
    const [items, setItems] = useState<any[]>();
    const [tableLoading, setTableLoading] = useState<boolean>(false);

    const [repoInfo, setRepoInfo] = useState<RepoInfo>();



    const modules = useSelector( ( state : RootState ) => state.modules);
    const module = modules.all.find( p=>p.id === moduleId)
    const moduleName = module?.title;

    const handleTableChange = async (pagination : any, filters : any , sorter : any)=>{
        setTableLoading(true);
        const client = new apiClient();
        const data = await client.repoModuleGetDocuments(moduleId, pagination.current, pagination.pageSize, sorter.column?.dataIndex, sorter.order);
        setItems(data);
        setTableLoading(false);

        console.log(sorter)

    }

    useEffect(()=>{
        async function fetchData(){
            const client = new apiClient();
            const info = await client.repoModuleGet(moduleId);
            setRepoInfo(info);

            const columns : any = info.properties.map((p) =>{
                return {
                    title : p, 
                    dataIndex  : p, 
                    key : p,
                    sorter : true
                }                
            })
            console.log("columns", columns)

            const data = await client.repoModuleGetDocuments(moduleId, 1, 50, null, null);
            console.log("data", data)
            setItems(data);

            setColumns(columns);
            setLoading(false);

        }
        fetchData();
    }, [])

    return (
        <Space direction="vertical" style={{ width: "100%" }}><PageHeader
    className="site-page-header"
    ghost={false}
    title={moduleName}
    subTitle={(repoInfo!=null) ? repoInfo.rows + " items" : "" }>

    </PageHeader>
    
    {(loading ? <Skeleton></Skeleton> : <Table 
        loading = {tableLoading}
        rowKey="_id" 
        dataSource={items} 
        columns={columns} 
        onChange={  handleTableChange }
        pagination = {{
            total : repoInfo?.rows,
            pageSize : 50
        }}
         />)}
    
    </Space>
    )



}





