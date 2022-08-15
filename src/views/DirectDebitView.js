import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom"; // Link

import { DataReferences } from "../references/DataReferences";
import { CurrencyFormat, DateFormat } from "../references/Functions";
import * as TextReferences from "../references/TextReferences";
import { getDirectDebits } from "../routes/Api";
import * as RouteConstants from "../routes/RouteConstants";
import { descriptionList } from "../templates/descriptionListHTML";
import { TableBodyHTML } from "../templates/Table";

const DirectDebitView = () => {
  const Ref = "DirectDebitMaintenance";
  const params = useParams();
  const history = useHistory();
  const TenantId = params.id ? decodeURIComponent(params.id) : "";

  const [searching, setSearching] = useState(false);
  const [directDebits, setDirectDebits] = useState(undefined);

  useEffect(() => {
    const searchCall = async () => {
      setSearching(true);
      const call = await getDirectDebits({
        TargetId: TenantId,
      });
      setDirectDebits(call);
      setSearching(false);
    };
    searchCall();
  }, [TenantId]);

  const DirectDebitMaintenance = () => {
    const maintenance = directDebits.results[0].directDebitMaintenance;

    if (!maintenance.length) {
      return (
        <>
          <h2>{TextReferences.Titles[Ref]}</h2>
          <p>{TextReferences.TextRef.NothingFound}</p>
        </>
      );
    }

    return (
      <>
        <h2>{TextReferences.Titles[Ref]}</h2>
        <div className="table-wrap">
          <table className="govuk-table lbh-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                {DataReferences[Ref].map((header, key) => {
                  return (
                    <th className="govuk-table__header" key={key}>
                      {header.title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <TableBodyHTML tableHead={Ref} data={maintenance} />
          </table>
        </div>
      </>
    );
  };

  const ddView = () => {
    const back = (
      <button
        onClick={history.goBack}
        className="mt-0 govuk-button lbh-button lbh-button-secondary"
        style={{ marginLeft: "10px" }}
      >
        {TextReferences.TextRef.Back}
      </button>
    );

    if (searching) {
      return (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1>{TextReferences.Titles.DirectDebit}</h1>
            <h4>{TextReferences.TextRef.Searching}</h4>
          </div>
          <div
            className="govuk-grid-column-one-thirds"
            style={{ textAlign: "right" }}
          >
            <p>{back}</p>
          </div>
        </div>
      );
    }

    if (directDebits === undefined || directDebits === null) {
      return (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1>{TextReferences.Titles.DirectDebit}</h1>
            <h4>{TextReferences.TextRef.NothingFound}</h4>
          </div>
          <div
            className="govuk-grid-column-one-thirds"
            style={{ textAlign: "right" }}
          >
            <p>{back}</p>
          </div>
        </div>
      );
    }

    const result = directDebits.results[0];
    const statusOptions = ["Cancelled", "Paused"];

    return (
      <>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1>{TextReferences.Titles.DirectDebit}</h1>
          </div>
          <div
            className="govuk-grid-column-one-thirds"
            style={{ textAlign: "right" }}
          >
            <p>
              {!statusOptions.includes(result.status) && (
                <Link
                  to={`${RouteConstants.DIRECTDEBIT}/${TenantId}/pause`}
                  className="govuk-button lbh-button mt-0"
                >
                  {result.isPaused ? "Unpause" : "Pause"}
                </Link>
              )}

              {!statusOptions.includes(result.status) && (
                <Link
                  to={`${RouteConstants.DIRECTDEBIT}/${TenantId}/edit`}
                  className="govuk-button lbh-button mt-0"
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </Link>
              )}
              {back}
            </p>
          </div>
        </div>

        <h2>Status Information</h2>
        {descriptionList([
          { key: "ID", val: result.id },
          { key: "Status", val: result.status },
          { key: "Paused", val: result.isPaused ? "Yes" : "No" },
          { key: "Created Date", val: DateFormat(result.createdDate) },
          { key: "Updated Date", val: DateFormat(result.updatedDate) },
          {
            key: "Cancellation Date",
            val: DateFormat(result.cancellationDate),
          },
          {
            key: "First Payment Date",
            val: DateFormat(result.firstPaymentDate),
          },
          { key: "Type", val: result.targetType },
        ])}

        <h2>Account Holder</h2>
        {descriptionList([
          { key: "Acc", val: result.acc },
          { key: "Account Holder", val: result.accountHolder },
          { key: "Account Number", val: result.accountNumber },
          { key: "Service User Number", val: result.serviceUserNumber },
        ])}

        <h2>Financial Details</h2>
        {descriptionList([
          { key: "Reference", val: result.reference },
          { key: "Amount", val: CurrencyFormat(result.amount) },
          {
            key: "Additional Amount",
            val: CurrencyFormat(result.additionalAmount),
          },
          { key: "Fixed Amount", val: CurrencyFormat(result.fixedAmount) },
          { key: "Fund", val: result.fund },
          {
            key: "Preferred Date",
            val: TextReferences.CollectionDates[result.preferredDate],
          },
          { key: "Payment Reference", val: result.paymentReference },
          { key: "Trans", val: result.trans },
        ])}

        <h2>Bank Details</h2>
        {descriptionList([
          { key: "To", val: result.bankOrBuildingSocietyTo },
          { key: "Branch Sort", val: result.branchSortCode },
          { key: "Bank Account Number", val: result.accountNumber },
          { key: "Bank Name", val: result.bankOrBuildingSocietyName },
          {
            key: "Bank Address",
            val: `${result.bankOrBuildingSocietyAddress1} ${result.bankOrBuildingSocietyAddress2} ${result.bankOrBuildingSocietyAddress3} ${result.bankOrBuildingSocietyPostcode}`,
          },
        ])}

        <DirectDebitMaintenance />
      </>
    );
  };

  return ddView();
};

export default DirectDebitView;
