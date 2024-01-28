
//key={invoice.id}
//id={invoice.id}
//show={modalShow}
//onHide={() => setModalShow(false)}
//invoice={invoice}
//published_date={created}

import { PDFDownloadLink, Document, Page, Font, StyleSheet, Text, View } from '@react-pdf/renderer'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"




const InvoiceModal = ({ invoice, show, onHide }) => {

    console.dir("invoiceonHidepublisheddate")
    console.dir({ invoice, onHide })

    const created = new Date(invoice.published_date).toLocaleString('ru-RU', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    const total_sum_no_vat = invoice.total_sum_no_vat;
    const total_sum = invoice.total_sum;
  
    const serv_invoice_rows = invoice.serviceRows.map(s_i_row => (
      <ServiceInvoiceRow
        key={s_i_row._id}
        id={s_i_row._id}
        title={s_i_row.title}
        price={s_i_row.price}
        count={s_i_row.count}
      />
    ));
  
    const vatS = invoice.srows_VAT;
    const vatSpercent = ((invoice.srows_VAT-1)*100).toFixed(0);
    const srows_sum_no_vat = invoice.srows_sum_no_vat;
  
    const material_invoice_rows = invoice.materialRows.map(m_i_row => (
      <MaterialInvoiceRow
        key={m_i_row.item_id}
        id={m_i_row.item_id}
        item={m_i_row.item}
        measure={m_i_row.measure}
        price={m_i_row.price}
        count={m_i_row.count}
      />
    ));
  
    const vatM = invoice.mrows_VAT;
    const vatMpercent = ((invoice.mrows_VAT-1)*100).toFixed(0);
    const mrows_sum_no_vat = invoice.mrows_sum_no_vat;
  
    function ServiceInvoiceRow(props) {
    
      return (
        <tr>
          <td className="text-start">
            {props.title}
          </td>
          <td>
            {(props.price).toFixed(2)}
          </td>
          <td>
            {(props.price * (vatS-1)).toFixed(2)}
          </td>
          <td>
            {(props.price * vatS).toFixed(2)}
          </td>
          <td>
            {props.count}
          </td>
          <td>
            {(props.price * props.count * vatS).toFixed(2)}
          </td>
        </tr>
      );
    }
  
    function MaterialInvoiceRow(props) {
    
      return (
        <tr>
          <td className="text-start">
            {props.item + ", " + props.measure}
          </td>
          <td>
            {(props.price).toFixed(2)}
          </td>
          <td>
            {(props.price * (vatM-1)).toFixed(2)}
          </td>
          <td>
            {(props.price * vatM).toFixed(2)}
          </td>
          <td>
            {props.count}
          </td>
          <td>
            {(props.price * props.count * vatM).toFixed(2)}
          </td>
        </tr>
      );
    }
  
  
    const pdf_serv_invoice_rows = invoice.serviceRows.map(s_i_row => (
      <PDF_ServiceInvoiceRow
        key={s_i_row._id}
        id={s_i_row._id}
        title={s_i_row.title}
        price={s_i_row.price}
        count={s_i_row.count}
      />
    ));
    function PDF_ServiceInvoiceRow(props) {
    
      return (
        <View style={styles.tableRow}>
          <View style={styles.tableCol_1}>
            <Text style={styles.tableCellLeft}>{props.title}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{(props.price).toFixed(2)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{(props.price * (vatS-1)).toFixed(2)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{(props.price * vatS).toFixed(2)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{props.count}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{(props.price * props.count * vatS).toFixed(2)}</Text>
          </View>
        </View>
      );
    }
  
    const  pdf_material_invoice_rows = invoice.materialRows.map(m_i_row => (
      <PDF_MaterialInvoiceRow
        key={m_i_row.item_id}
        id={m_i_row.item_id}
        item={m_i_row.item}
        measure={m_i_row.measure}
        price={m_i_row.price}
        count={m_i_row.count}
      />
    ));
    function PDF_MaterialInvoiceRow(props) {
    
      return (
        <View style={styles.tableRow}>
          <View style={styles.tableCol_1}>
            <Text style={styles.tableCellLeft}>{props.item + ", " + props.measure}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{(props.price).toFixed(2)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{(props.price * (vatM-1)).toFixed(2)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{(props.price * vatM).toFixed(2)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{props.count}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{(props.price * props.count * vatM).toFixed(2)}</Text>
          </View>
        </View>
      );
    }
  
    // Register font
  Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
  });
  
  // Reference font and etc.
  const styles = StyleSheet.create({
    table: { 
      display: "table", 
      width: "auto", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0,
      margin: 10
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    },
    tableCol_1: { 
      width: "30%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },  
    tableCol: { 
      width: "14%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },
    tableCol_Sum: {
      width: "42%",  
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    }, 
    tableCell: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 10 
    },
    tableCellRight: { 
      textAlign: "right",
      marginTop: 5, 
      fontSize: 10 
    },
    tableCellLeft: { 
      textAlign: "left",
      marginTop: 5, 
      fontSize: 10 
    },
    font: {
      fontFamily: 'Roboto'
    },
    center: { 
      textAlign: "center",
      fontSize: 14
    },
    center_2: { 
      textAlign: "center",
      fontSize: 10
    },
    td_important: {
      width: "14%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      backgroundColor: "#35bddf1a"
    },
    td_very_important: {
      width: "14%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      backgroundColor: "#df9b3538"
    }
  
  })
  
    const element = (
      <View>
         <View style={styles.center}>
          <Text>АКТ-КВИТАНЦИЯ&nbsp;от&nbsp;{created}</Text> 
        </View>
        <View style={styles.center_2}>
          <Text>на выполнение дополнительных видов работ (услуг)</Text> 
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol_1}>
              <Text style={styles.tableCell}>Наименование работ (услуг)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Тариф без НДС</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>НДС {vatSpercent}%</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Тариф с НДС</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>кол-во</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>сумма,р</Text>
            </View>
          </View>
            {pdf_serv_invoice_rows}
          <View style={styles.tableRow}>
            <View style={styles.tableCol_1}>
              <Text style={styles.tableCellRight}>Итого за работы:</Text>
            </View>
            <View style={styles.td_important}>
              <Text style={styles.tableCell}>{srows_sum_no_vat.toFixed(2)}</Text>
            </View>
            <View style={styles.tableCol_Sum}>
              <Text style={styles.tableCellRight}>рублей в том числе НДС:</Text>
            </View>
            <View style={styles.td_important}>
              <Text style={styles.tableCell}>{(srows_sum_no_vat * vatS).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol_1}>
              <Text style={styles.tableCell}>Наименование запчастей</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Стоим. без НДС</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>НДС {vatMpercent}%</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Стоим. с НДС</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>кол-во</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>сумма,р</Text>
            </View>
          </View>
              {pdf_material_invoice_rows}
          <View style={styles.tableRow}>
            <View style={styles.tableCol_1}>
              <Text style={styles.tableCellRight}>Итого за материалы:</Text>
            </View>
            <View style={styles.td_important}>
              <Text style={styles.tableCell}>{mrows_sum_no_vat.toFixed(2)}</Text>
            </View>
            <View style={styles.tableCol_Sum}>
              <Text style={styles.tableCellRight}>рублей в том числе НДС:</Text>
            </View>
            <View style={styles.td_important}>
              <Text style={styles.tableCell}>{(mrows_sum_no_vat * vatM).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol_1}>
              <Text style={styles.tableCellRight}>ИТОГО по Акту-квит.:</Text>
            </View>
            <View style={styles.td_very_important}>
              <Text style={styles.tableCell}>{(total_sum_no_vat).toFixed(2)}</Text>
            </View>
            <View style={styles.tableCol_Sum}>
              <Text style={styles.tableCellRight}>рублей в том числе НДС:</Text>
            </View>
            <View style={styles.td_very_important}>
              <Text style={styles.tableCell}>{(total_sum).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  
    //const html = ReactDOMServer.renderToStaticMarkup(element);
  
    const MyDoc = () => (
      <Document>
        <Page size="A4" style={styles.font}>
          {element}
        </Page>
      </Document>
    );
  
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          <p>Дата и время выписки:&nbsp;<b>{created}</b></p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="col">
            <h2 className="d-flex justify-content-center">
              <b>АКТ-КВИТАНЦИЯ</b>
            </h2>
            <p className="d-flex justify-content-center">
              на выполнение дополнительных видов работ (услуг)
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
                  НДС {vatSpercent}%
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
              {serv_invoice_rows}
              <tr>
                <td className="align-middle text-end">Итого за работы:</td>
                <td className="td_important">{srows_sum_no_vat.toFixed(2)}</td>
                <td colSpan="3" className="align-middle text-end">
                  рублей в том числе НДС:
                </td>
                <td className="td_important">{(srows_sum_no_vat * vatS).toFixed(2)}</td>
              </tr>
              <tr>
                <th scope="col" className="align-middle text-center">
                  Наименование запчастей
                </th>
                <th sscope="col" className="align-middle text-center">
                  Стоим. без НДС
                </th>
                <th scope="col" className="align-middle text-center">
                  НДС {vatMpercent}%
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
              {material_invoice_rows}
              <tr>
                <td className="align-middle text-end">Итого за материалы:</td>
                <td className="td_important">{mrows_sum_no_vat.toFixed(2)}</td>
                <td colSpan="3" className="align-middle text-end">
                  рублей в том числе НДС:
                </td>
                <td className="td_important">{(mrows_sum_no_vat * vatM).toFixed(2)}</td>
              </tr>
              <tr>
                <th scope="col" className="align-middle text-end">
                  ИТОГО по Акту-квит.:
                </th>
                <th scope="col" className="td_very_important align-middle text-center">
                  {(total_sum_no_vat).toFixed(2)}
                </th>
                <th colSpan="3" scope="col" className="align-middle text-end">
                  рублей в том числе НДС:
                </th>
                <th className="td_very_important align-middle text-center">
                  {(total_sum).toFixed(2)}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        &nbsp;
      </div>
        </Modal.Body>
        <Modal.Footer>
        <div className="container">
          <div className="row">
            <div className="col text-start">
              <Button variant="success">
                <PDFDownloadLink document={<MyDoc />} fileName={created}>
                  {({ blob, url, loading, error }) =>
                  loading ? 'Загружается...' : 'Скачать .pdf'
                  }
                </PDFDownloadLink>
              </Button>
            </div>
            <div className="col text-end">
              <Button variant="secondary" onClick={onHide}>Закрыть</Button>
            </div>
          </div>
        </div>
        </Modal.Footer>
      </Modal>
    );
}

export default InvoiceModal