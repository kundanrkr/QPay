import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { message, Table, Transfer } from "antd";
import TransferFundsModal from "./TransferFundsModal";
import DepositModal from "./DepositModal";
import { useDispatch } from "react-redux";
import { GetUserTransactionsofUser } from "../../apicalls/transactions";
import { HideLoading, ShowLoading } from "../../redux/LoadersSlice";
import moment from "moment";
import { useSelector } from "react-redux";

const Transactions = () => {
  const [showTransferFundsModal, setShowTransferFundsModal] =
    React.useState(false);

  const [showDepositModal, setShowDepositModal] = React.useState(false);
  const [data = [], setData] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        // return record.sender._id === user._id ? "Debit" : "Credit";
        if (record.sender._id === record.receiver._id) {
          return "Deposit";
        } else if (record.sender._id === user._id) {
          return "Debit";
        } else {
          return "Credit";
        }
      },
    },
    {
      title: "Sender/Receiver",
      dataIndex: "",
      render: (text, record) => {
        return record.sender._id === user._id ? (
          <div>
            <h1 className="text-sm">
              {record.receiver.firstName} {record.receiver.lastName}
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="text-sm">
              {record.sender.firstName} {record.sender.lastName}
            </h1>
          </div>
        );
      },
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetUserTransactionsofUser();
      if (response.success) {
        setData(response.data.map((txn) => ({ ...txn, key: txn._id })));
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center p-r-2">
        <PageTitle title="Transactions" />

        <div className="flex gap-1">
          <button
            className="primary-outlined-btn"
            onClick={() => setShowDepositModal(true)}
          >
            Deposit
          </button>
          <button
            className="primary-contained-btn"
            onClick={() => setShowTransferFundsModal(true)}
          >
            Transfer
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} className="mt-2" />

      {showTransferFundsModal && (
        <TransferFundsModal
          showTransferFundsModal={showTransferFundsModal}
          setShowTransferFundsModal={setShowTransferFundsModal}
          reloadData={getData}
        />
      )}

      {showDepositModal && (
        <DepositModal
          showDepositModal={showDepositModal}
          setShowDepositModal={setShowDepositModal}
          reloadData={getData}
        />
      )}
    </div>
  );
};

export default Transactions;
