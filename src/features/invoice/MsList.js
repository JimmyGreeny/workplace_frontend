import { useGetMaterialsQuery } from "./materialsApiSlice"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import Dnd from "./dnd-kit/Dnd.js"

const MsList = () => {
  useTitle('techMaterials: Materials List')

  const { username, isManager, isAdmin } = useAuth()

  const {
    data
  } = useGetMaterialsQuery('materialsList', {
    selectFromResult: ({ data }) => ({
      data: data?.ids.map(id => data?.entities[id])
    }),
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  //const newArr = data.map(filteredMaterial => <p>{filteredMaterial.id}</p>)
  
  if (data) {
    console.dir("IT IS OBJECT" + data)
    
    data.sort((a,b) => a.index - b.index); // b - a for reverse sort

    let content

    //if (isSuccess) {
    //const { ids, entities } = materials

    //let filteredIds
    //if (isManager || isAdmin) {
    //  filteredIds = [...ids]
    //} else {
    //  filteredIds = ids.filter(materialId => entities[materialId].username === username)
    //}

    //const tableContent = materials.map(materialId => <p key={materialId._id}>{materialId._id}</p>)

    content = (
      <div>
        <button
          type="button"
          className="materials_btn" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
        >
          Материалы
        </button>
        {/*{tableContent}*/}
        <Dnd materials={data} />
        {/*&nbsp;
        {data.map((x) => (
          <p>{x.in_stock}</p>
        ))}*/}
      </div>
    )
    //}

    return content
  }
}
export default MsList