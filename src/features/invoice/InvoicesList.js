import { useGetInvoicesQuery } from "./invoicesApiSlice"
import InvoiceRow from "./InvoiceRow"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import './style.css'

const InvoicesList = () => {
  useTitle('techInvoices: Invoices List')

  const { username, isManager, isAdmin } = useAuth()

  const {
    data: invoices,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetInvoicesQuery('invoicesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <PulseLoader color={"#FFF"} />

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids, entities } = invoices

    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(invoiceId => entities[invoiceId].username === username)
    }

    const tableContent = ids?.length && filteredIds.map(invoiceId => <InvoiceRow key={invoiceId} invoiceId={invoiceId} />)

    content = (
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="materials_btn" data-bs-toggle="collapse" data-bs-target="#collapseInvoice" aria-expanded="false" aria-controls="collapseInvoice"
          >
            Квитанции
          </button>
        </div>
        <div>
          <table className="table table-sm table-bordered table-striped table-hover m-0 " id="collapseInvoice">
            <tbody>
              <tr className="InvoiceColumn">
                <th scope="col" className="align-middle text-center InvoiceColumn">
                  Дата выписки
                </th>
                <th scope="col" className="align-middle text-center InvoiceColumn">
                  Адрес
                </th>
                <th scope="col" className="align-middle text-center InvoiceColumn">
                  Телефон
                </th>
                <th scope="col" className="align-middle text-center InvoiceColumn">
                  Сумма
                </th>
              </tr>
              {tableContent}
            </tbody>
          </table>
        </div>
        &nbsp;
      </div>
    )
  }

  return content
}
export default InvoicesList