import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import helpers from "./helpers.js";
import InputSpinner from "./InputSpinner.js";
import AddSorMRowButton from "./AddSorMRowButton.js";
import ServicesData from "./services.json";
import { useSelector, shallowEqual } from 'react-redux'
//import { selectCurrentToken } from "../auth/authSlice"
import InvoicesList from "./InvoicesList.js"
import MsList from "./MsList.js"
import NewMaterialBtn from "./NewMaterialBtn.js"
import { useGetMaterialsQuery } from "./materialsApiSlice"
import { useDispatch } from 'react-redux'
import { setPrice } from './PriceSlice'
import { useUpdateMaterialMutation } from "./materialsApiSlice"

const Invoice = () => {

  console.log("Hi Invoice");
  const s_VATpercent = 20;
  const m_VATpercent = 20;

  const [serv_rows, setServices] = useState([]);

  const handleAddService = () => {
    const empty_s_row = helpers.newServRow();
    setServices([...serv_rows, empty_s_row]);
    console.log(empty_s_row);
  };

  const [material_rows, setMaterials] = useState([]);

  const handleAddMaterial = () => {
    const empty_m_row = helpers.newMaterialRow();
    setMaterials([...material_rows, empty_m_row]);
    console.log(empty_m_row);
  };

  const editServiceRow = attrs => {

    setServices(prevState => {
      const newState = prevState.map(obj => {
        if (obj.id === attrs.id)
          return Object.assign({}, obj, attrs);
        return obj;
      });
      //setInvoice({...invoice, materialRows: newState});
      return newState;
    });
  };

  const editMaterialRow = attrs => {

    setMaterials(prevState => {
      const newState = prevState.map(obj => {
        if (obj.id === attrs.id)
          return Object.assign({}, obj, attrs);
        return obj;
      });
      //setInvoice({...invoice, materialRows: newState});
      return newState;
    });
  };

  const [invoices, setInvoices] = useState([]);

  //const token = useSelector(selectCurrentToken)

  //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6IkRhbkQiLCJyb2xlcyI6WyJFbXBsb3llZSIsIk1hbmFnZXIiLCJBZG1pbiJdfSwiaWF0IjoxNzAyOTM2MTUyLCJleHAiOjE3MDI5MzcwNTJ9.39f-RkKbmdlye37scH7gxhQdKLTVEgznrbWJ1RYX560"
  //console.log(token);

  const deleteServiceRow = serv_rowId => {
    setServices(current =>
      current.filter(sr => {
        return sr.id !== serv_rowId;
      })
    );
  };

  const deleteMaterialRow = material_rowId => {
    setMaterials(current =>
      current.filter(mr => {
        return mr.id !== material_rowId;
      })
    );
  };
/*
  const handleEditService = attrs => {
    setServices(prevState => {
      const newState = prevState.map(obj => {
        if (obj.id === attrs.id)
          return Object.assign({}, obj, {
            title: String(attrs.title),
            price: Number(attrs.price),
            count: attrs.count
          });
        return obj;
      });
      //setInvoice({...invoice, serviceRows: newState});
      return newState;
    });
    //setInvoice({...invoice, serviceRows: newState});
  };
  
    const handleEditMaterial = attrs => {
      setMaterials(prevState => {
        const newState = prevState.map(obj => {
          if (obj.id === attrs.id)
            return Object.assign({}, obj, {
              item: attrs.item,
              measure: attrs.measure,
              price: Number(attrs.price),
              count: attrs.count,
              item_id: attrs.item_id
            });
          return obj;
        });
        //setInvoice({...invoice, materialRows: newState});
        return newState;
      });
    };
  
    const handleEditMaterialPrice = attrs => {
      if (attrs.item_id !== "") {
        setMaterials(prevState => {
          const newState = prevState.map(obj => {
            if (obj.item_id === attrs.item_id)
              return Object.assign({}, obj, {
                price: attrs.price
              });
            return obj;
          });
          return newState;
        });
      }
    };
  */
  const [totallS, setTotallService] = useState([]);
  const onSetTotallService = totall => {
    setTotallService(totall);
  };

  const [totallM, setTotallMaterial] = useState([]);
  const onSetTotallMaterial = totall => {
    setTotallMaterial(totall);
  };

  const handleAddInvoice = invoice => {
    setInvoices([...invoices, invoice]);
  };

  return (
    <div className="container">
      <InvoiceList
        serv_rows={serv_rows}
        services={ServicesData}
        onTrashClickService={deleteServiceRow}
        editServiceRow={editServiceRow}
        onAddService={handleAddService}
        s_VATpercent={s_VATpercent}
        material_rows={material_rows}
        onTrashClickMaterial={deleteMaterialRow}
        //onEditMaterial={handleEditMaterial}
        //handleEditMaterialPrice={handleEditMaterialPrice}
        onAddMaterial={handleAddMaterial}
        m_VATpercent={m_VATpercent}
        onSetTotallService={onSetTotallService}
        onSetTotallMaterial={onSetTotallMaterial}

        editMaterialRow={editMaterialRow}
      />
      <AddInvoices
        //invoices={invoices}
        serv_rows={serv_rows}
        material_rows={material_rows}
        totallS={totallS}
        totallM={totallM}
        s_VATpercent={s_VATpercent}
        m_VATpercent={m_VATpercent}
        onAddInvoice={handleAddInvoice}
      />
      <MsList />
      <InvoicesList />
    </div>
  );
}

function AddInvoices(props) {
  const vatS = 1 + props.s_VATpercent / 100;
  const vatM = 1 + props.m_VATpercent / 100;
  const srows_sum = (props.totallS * vatS).toFixed(2);
  const mrows_sum = (props.totallM * vatM).toFixed(2);
  const total_sum_no_vat = (props.totallS + props.totallM);
  const total_sum = Number(srows_sum) + Number(mrows_sum);


  useEffect(() => {
    console.log("SERV ROW" + total_sum);
    setInvoice({
      serviceRows: props.serv_rows,
      srows_sum_no_vat: props.totallS,
      srows_VAT: vatS,
      materialRows: props.material_rows,
      mrows_sum_no_vat: props.totallM,
      mrows_VAT: vatM,
      total_sum_no_vat: total_sum_no_vat,
      total_sum: (total_sum).toFixed(2)
    });
  }, [props]);

  const [invoice, setInvoice] = useState({});

  const handleAddInvoice = () => {
    //props.onAddInvoice(invoice);
    //const empty_m = helpers.newMaterial();
    //setInvoice(prevInvoice => ({
    //  ...prevInvoice,
    //  serviceRows: serv_rows,
    //  materialRows: material_rows
    //}));
    console.log("INVOICE" + invoice);
    //console.log(empty_m);
    //console.log(serv_rows);

    axios
      .post('http://localhost:3500/invoices', invoice)
      .then((res) => {
        console.log(res.data);
        props.onAddInvoice(res.data);
        //Object.assign(empty_m, {_id: res.data});
        //setMaterial([...materials, empty_m]);
      })
      .catch((err) => {
        console.log('Error in CreateInvoice!');
      });
  };
  //const invoices = props.invoices.map(invoice => (
  //  <InvoiceRow
  //    key={invoice.id}
  //    id={invoice.id}
  //  />
  //));

  return (
    <div>
      <button
        className="add_invoice font-weight-bold"
        onClick={handleAddInvoice}
      >Выписать Квитанцию
      </button>
      &nbsp;
      {/*invoices*/}
    </div>
  );
}

function InvoiceList(props) {

  const updateTotallService = e => {
    props.onSetTotallService(e);
  };

  const updateTotallMaterial = e => {
    props.onSetTotallMaterial(e);
  };

  console.log("Hi InvoiceList");
  const serv_rows = props.serv_rows.map(serv_row => (
    <ServiceRow
      key={serv_row.id}
      serv_row={serv_row}
      //id={serv_row.id}
      //title={serv_row.title}
      onTrashClickService={props.onTrashClickService}
      editServiceRow={props.editServiceRow}
      services={props.services}
      s_VATpercent={props.s_VATpercent}
    />
  ));
  const material_rows = props.material_rows.map(material_row => (
    <MaterialRow
      key={material_row.id}
      material_row={material_row}
      editMaterialRow={props.editMaterialRow}
      //id={material_row.id}
      //item_id={material_row.item_id}
      onTrashClickMaterial={props.onTrashClickMaterial}
      //onEditMaterial={props.onEditMaterial}
      //handleEditMaterialPrice={props.handleEditMaterialPrice}
      m_VATpercent={props.m_VATpercent}
    />
  ));

  return (
    <div className="row">
      <div className="col">
        <h2 className="d-flex justify-content-center">
          <b>АКТ-КВИТАНЦИЯ</b>
        </h2>
        <p className="d-flex justify-content-center">
          на выполнение дополнительных видов работ (услуг)
        </p>
        <p className="d-flex justify-content-center">
          <b>
            Тарифы на дополнительные виды работ по абонентским пунктам
            Приложение 46. Вводятся с 01 мая 2022 года
          </b>
        </p>
      </div>
      <div>
        <table className="table table-sm table-bordered table-striped table-hover m-0">
          <tbody>
            <tr>
              <th scope="col" className="align-middle text-center">
                Наименование работ (услуг)
              </th>
              <th sscope="col" className="align-middle text-center">
                Тариф без НДС
              </th>
              <th scope="col" className="align-middle text-center">
                НДС {props.s_VATpercent}%
              </th>
              <th scope="col" className="align-middle text-center">
                Тариф с НДС
              </th>
              <th scope="col" className="align-middle text-center">
                кол-во
              </th>
              <th scope="col" className="align-middle text-center">
                сумма,р
              </th>
            </tr>
            {serv_rows}
            <SumRows
              rows={props.serv_rows}
              VATpercent={props.s_VATpercent}
              setTotall={total => updateTotallService(total)}
              text={"работы"}
            />
            <AddSorMRowButton onAddRow={props.onAddService} />
            <tr>
              <th scope="col" className="align-middle text-center">
                Наименование запчастей
              </th>
              <th sscope="col" className="align-middle text-center">
                Стоим. без НДС
              </th>
              <th scope="col" className="align-middle text-center">
                НДС {props.m_VATpercent}%
              </th>
              <th scope="col" className="align-middle text-center">
                Стоим. с НДС
              </th>
              <th scope="col" className="align-middle text-center">
                кол-во
              </th>
              <th scope="col" className="align-middle text-center">
                сумма,р
              </th>
            </tr>
            {material_rows}
            <SumRows
              rows={props.material_rows}
              VATpercent={props.m_VATpercent}
              setTotall={total => updateTotallMaterial(total)}
              text={"материалы"}
            />
            <AddSorMRowButton onAddRow={props.onAddMaterial} />
            <TotalSum
              serv_rows={props.serv_rows}
              material_rows={props.material_rows}
              sVATpercent={props.s_VATpercent}
              mVATpercent={props.m_VATpercent}
            />
          </tbody>
        </table>
      </div>
      &nbsp;
    </div>
  );
}

function ServiceRow(props) {
  const s_VATpercent = props.s_VATpercent;
  const vat = 1 + s_VATpercent / 100;

  const [price, setPriceState] = useState(0);
  const [s_row, s_rowSetChange] = useState(props.serv_row) //PROBABLY NOT CORRECT!
  const [n, setN] = useState(0);
  //const [count, setCount] = useState("");
  const services = props.services;

  const updateCount = e => {
    setN(e);
    //console.log(e);
    s_rowSetChange((prevState) => {
      const newState = {
        ...prevState,
        count: e
      }
      props.editServiceRow(newState)
      return newState
    });
    /*
    props.onEditService({
      id: props.id,
      title: props.title,
      price: price,
      count: e
    });
    */
  };

  const updatePrice = e => {
    const selected_price = services
      .filter(service => service.id === Number(e.target.value))
      .map(filteredService => filteredService.price)

    const selected_title = services
      .filter(service => service.id === Number(e.target.value))
      .map(filteredService => filteredService.title)

    setPriceState(selected_price);

    s_rowSetChange((prevState) => {
      const newState = {
        ...prevState,
        title: selected_title,
        price: selected_price,
      }
      props.editServiceRow(newState)
      return newState
    });
    /*
    props.onEditService({
      id: props.id,
      title: selected_title,
      price: selected_price,
      count: n
    });
    */
  };

  const handleTrashClick = () => {
    props.onTrashClickService(props.serv_row.id);
  };



  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <select onChange={updatePrice} defaultValue="">
                <option></option>
                {services.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </td>
      <td>{price}</td>
      <td>{(price * (vat - 1)).toFixed(2)}</td>
      <td>{(price * vat).toFixed(2)}</td>
      <td>
        <InputSpinner step={1.0} onChange={count => updateCount(count)} />
      </td>
      <td>
        <div className="d-flex justify-content-between">
          {(n * price * vat).toFixed(2)}
          <span
            className="pointer"
            onClick={handleTrashClick}
            aria-hidden="true"
            role="img"
            aria-label="x"
          >
            &#x274C;
          </span>
        </div>
      </td>
    </tr>
  );
}

function SumRows(props) {
  useEffect(() => {
    console.log("SET Totall");
    props.setTotall(Number(total.toFixed(2)))
  }, [props]);

  const text = props.text;
  console.log(text);

  const rows = props.rows;
  const VATpercent = props.VATpercent;
  const vat = 1 + VATpercent / 100;
  var total = 0;
  for (var i = 0; i < rows.length; i++) {
    total += rows[i].price * rows[i].count;
  }
  //const totalWithVAT = (total * vat).toFixed(2)
  //const total = serv_rows.map((serv_row) => (
  //  <div key={this.props.id}>{serv_row.price * serv_row.count}</div>
  //))
  return (
    <tr>
      <td className="align-middle text-end">Итого за {text}:</td>
      <td className="td_important">{total.toFixed(2)}</td>
      <td colSpan="3" className="align-middle text-end">
        рублей в том числе НДС:
      </td>
      <td className="td_important">{(total * vat).toFixed(2)}</td>
    </tr>
  );
}
//editable input:
//<input value={this.state.price} onChange={this.handlePriceChange} />

//key={material_row.id}
//id={material_row.id}
//item_id={material_row.item_id}
//onTrashClickMaterial={props.onTrashClickMaterial}
//onEditMaterial={props.onEditMaterial}
//handleEditMaterialPrice={props.handleEditMaterialPrice}
//m_VATpercent={props.m_VATpercent}


function MaterialRow(props) {
  const m_VATpercent = props.m_VATpercent;
  const vat = 1 + m_VATpercent / 100;

  const dispatch = useDispatch()

  const [price, setPriceState] = useState(0);
  const [m_row, m_rowSetChange] = useState(props.material_row) //PROBABLY NOT CORRECT!

  const selectPriceById = (state, todoId) => {
    return state.price.filter(record => record.item_id === todoId).map(item => item.price)
  }
  const price_reduxStore = useSelector(state => selectPriceById(state, m_row.item_id), shallowEqual)

  useEffect(() => {
    if (price_reduxStore?.length) {
      //const result = Number(record)
      setPriceState(Number(price_reduxStore))

      m_rowSetChange((prevState) => {
        const newState = {
          ...prevState,
          price: Number(price_reduxStore)
        }
        props.editMaterialRow(newState)
        return newState
      });
    }
  }, [price_reduxStore]);

  const [n, setN] = useState(0);

  const [updateMaterial] = useUpdateMaterialMutation()
  //const [inpkey, setInpkey] = useState(0);
  //const [count, setCount] = useState("");

  const {
    data
  } = useGetMaterialsQuery('materialsList', {
    selectFromResult: ({ data }) => ({
      data: data?.ids.map(id => data?.entities[id])
    }),
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const materials = data.sort((a, b) => a.index - b.index); // b - a for reverse sort

  //const material_id = materials //Should look at it later 28/01/24
  //  .filter(material => material._id === m_row.item_id)
  //  .map(filteredMaterial => filteredMaterial._id)

  //const VATamount = (init_price * (vat - 1)).toFixed(2)
  //const priceWithVAT = (init_price * vat).toFixed(2)
  //const rowValue = (n * init_price * vat).toFixed(2)

  const updateCount = e => {
    setN(e);
    //console.log(e);
    //const selected_item = materials
    //  .filter(material => material._id === m_row.item_id)
    //  .map(filteredMaterial => filteredMaterial.item)

    //const selected_measure = materials
    //  .filter(material => material._id === m_row.item_id)
    //  .map(filteredMaterial => filteredMaterial.measure)

    m_rowSetChange((prevState) => {
      const newState = {
        ...prevState,
        count: e
      }
      props.editMaterialRow(newState)
      return newState
    });

    //console.log("m_row");
    //console.log(m_row);
    //props.onEditMaterial({
    //  id: props.id,
    //  item: String(selected_item),
    //  measure: String(selected_measure),
    //  price: init_price,
    //  count: e,
    //  item_id: props.item_id
    //});
  };

  const updatePrice = e => {
    //const selected_price = materials
    //  .filter(material => material._id === e.target.value)
    //  .map(filteredMaterial => filteredMaterial.price)

    const init_price = materials
      .filter(material => material._id === e.target.value)
      .map(filteredMaterial => filteredMaterial.price)[0]

    const selected_item = materials
      .filter(material => material._id === e.target.value)
      .map(filteredMaterial => filteredMaterial.item)

    const selected_measure = materials
      .filter(material => material._id === e.target.value)
      .map(filteredMaterial => filteredMaterial.measure)

    setPriceState(init_price)

    m_rowSetChange((prevState) => {
      const newState = {
        ...prevState,
        item_id: e.target.value,
        item: String(selected_item),
        measure: String(selected_measure),
        price: init_price
      }
      props.editMaterialRow(newState)
      return newState
    });

    //props.editMaterialRow(m_row)

    //props.onEditMaterial({
    //  id: props.id,
    //  item: String(selected_item),
    //  measure: String(selected_measure),
    //  price: selected_price,
    //  count: n,
    //  item_id: e.target.value
    //});
    console.log(e.target.value);
  };

  const updateOnlyPrice = async e => {////////should be changed!!!!!!
    setPriceState(Number(e.target.value))
    await updateMaterial({ id: m_row.item_id, price: Number(e.target.value) })

    m_rowSetChange((prevState) => {
      const newState = {
        ...prevState,
        price: Number(e.target.value)
      }
      props.editMaterialRow(newState)
      return newState
    });
    //handleChange(e.target.value);
    //setInpkey(e.target.selectedIndex);
    //props.handleEditMaterialPrice({
    //  item_id: String(material_id),
    //  price: e.target.value
    //});
    //console.log(props.item_id);
    dispatch(setPrice([{ item_id: String(m_row.item_id), price: Number(e.target.value) }]))
  };

  const handleTrashClick = () => {
    props.onTrashClickMaterial(props.material_row.id);
  };



  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <select onChange={updatePrice} defaultValue="">
                <option></option>
                {materials.map((option, index) => (
                  <option key={index} value={option._id}>
                    {option.item + ", " + option.measure}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </td>
      <td>
        <input
          className="inrow_material_price"
          value={price}
          onChange={updateOnlyPrice}
        />
      </td>
      <td>{(price * (vat - 1)).toFixed(2)}</td>
      <td>{(price * vat).toFixed(2)}</td>
      <td>
        <InputSpinner step={0.5} onChange={count => updateCount(count)} />
      </td>
      <td>
        <div className="d-flex justify-content-between">
          {(n * price * vat).toFixed(2)}
          <span
            className="pointer"
            onClick={handleTrashClick}
            aria-hidden="true"
            role="img"
            aria-label="x"
          >
            &#x274C;
          </span>
        </div>
      </td>
    </tr>
  );
}

function TotalSum(props) {
  const sVATpercent = props.sVATpercent;
  const mVATpercent = props.mVATpercent;
  const svat = 1 + sVATpercent / 100;
  const mvat = 1 + mVATpercent / 100;

  const material_rows = props.material_rows;
  var total_materials = 0;
  for (var i = 0; i < material_rows.length; i++) {
    total_materials += material_rows[i].price * material_rows[i].count;
  }
  const serv_rows = props.serv_rows;
  var total_serv = 0;
  for (i = 0; i < serv_rows.length; i++) {
    total_serv += serv_rows[i].price * serv_rows[i].count;
  }
  //const total = serv_rows.map((serv_row) => (
  //  <div key={this.props.id}>{serv_row.price * serv_row.count}</div>
  //))
  return (
    <tr>
      <th scope="col" className="align-middle text-end">
        ИТОГО по Акту-квит.:
      </th>
      <th scope="col" className="td_very_important align-middle text-center">
        {(total_materials + total_serv).toFixed(2)}
      </th>
      <th colSpan="3" scope="col" className="align-middle text-end">
        рублей в том числе НДС:
      </th>
      <th className="td_very_important align-middle text-center">
        {(total_materials * mvat + total_serv * svat).toFixed(2)}
      </th>
    </tr>
  );
}



export default Invoice;
//lsof -i tcp:3000
//kill -9 15640

//mistakes and tasks

//-
//added material then made invoice with that material and got the error:
//react-jsx-dev-runtime.development.js:87 Warning: Each child in a list should have a unique "key" prop.
//+

//-
//material list doesn't refresh live after canceling invoice
//+

//-
//If I'm adding new invoice with initial choise (i.e. empty materials and zero value) then cannot cancel it, getting error code 400
//+

//-
//When adding a price to newly added material row with initial choise (i.e. empty materials and zero value), getting error: PUT http://localhost:3500/invoices/materials/ 404 (Not Found)
//

