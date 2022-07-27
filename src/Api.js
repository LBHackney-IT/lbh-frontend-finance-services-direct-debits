import Cookies from 'js-cookie'
import { format } from 'date-fns'

const date_format = 'yyyy-MM-dd'

const sendCall = async (url, body) => {
  try {
    let output = []
    await fetch(`${process.env.FINANCE_DETAILS_API}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('hackneyToken')}`
        },
        body: JSON.stringify(body)
      }
    ).then(response => {
      return response.json()
    }).then(data => {
      output = data
    })
    return output
  } catch (error) {
    console.log(error)
  }
}

const requestCall = async (url, config) => {
  try {
    let output = []
    await fetch(`${process.env.FINANCE_DETAILS_API}${url}${config ? '?' + new URLSearchParams(config) : ''}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('hackneyToken')}`
        },
      }
    ).then(response => {
      return response.json()
    }).then(data => {
      output = data
    })
    // const { data } = await instance.get(url, config)
    return output
  } catch (error) {
    console.log(error)
  }
} // requestCall

const getOperatingBalances = async params => {
  const { startDate, endDate, startYearNo, endYearNo, startWeekNo, endWeekNo } = params
  return requestCall('/operatingbalance', {
    startDate: startDate ? format(startDate, date_format) : null,
    endDate: endDate ? format(endDate, date_format) : null,
    startWeek: startWeekNo,
    startYear: startYearNo,
    endWeek: endWeekNo,
    endYear: endYearNo,
  })
} // getOperatingBalances

const getBatchLog = async () => {
  return requestCall('/batch/errors', '')
} // getBatchLog

const getTenancySummary = async ({ startDate, endDate }) => {
  return requestCall('/transaction/summary', {
    startDate: startDate && format(startDate, date_format),
    endDate: endDate && format(endDate, date_format),
  })
} // getTenancySummary

const getTenancy = async params => {
  const { tenancyAgreementRef, rentAccount, householdRef } = params
  return requestCall('/tenancy', {
    tenancyAgreementRef: tenancyAgreementRef ?? '',
    rentAccount: rentAccount ?? '',
    householdRef: householdRef ?? '',
  })
} // getTenancy

const getTenancyTransactions = async params => {
  const { tenancyAgreementRef, rentAccount, householdRef, count } = params
  return requestCall('/tenancy/transaction', { 
    count: count ?? 5,
    tenancyAgreementRef: tenancyAgreementRef ?? '',
    rentAccount: rentAccount ?? '',
    householdRef: householdRef ?? '',
  })
} // getTenancyTransactions

const getReportCharges = async () => {
  return requestCall('/report/charges', '')
} // getReportCharges

const postReportCharges = async params => {
  const { year, rentGroup, group } = params
  return requestCall('/report/charges', {
    year: Number(year),
    rentGroup, // rentgroup / All Rentgroups / LH / Rent
    group
  })
} // postReportCharges

const getReportCashImport = async () => {
  return requestCall('/report/cash/import', '')
} // getReportCashImport

const postReportCashImport = async params => {
  const { startDate, endDate } = params
  return sendCall('/report/cash/import', {
    startDate: startDate ? format(startDate, date_format) : null,
    endDate: endDate ? format(endDate, date_format) : null,
  })
} // postReportCashImport

const getReportCashSuspense = async () => {
  return requestCall('/report/cash/suspense', '')
} // getReportCashSuspense

const postReportCashSuspense = async params => {
  const { year, rentGroup } = params
  console.log(params)
  return sendCall('/report/cash/suspense', {
    year: Number(year),
    suspenseAccountType: rentGroup, // Rent / Leasehold / Housing Benefit
  })
} // getReportCashSuspense

const getReportBalance = async () => {
  return requestCall('/report/balance', {
  })
} // getReportBalance

const postReportBalance = async params => {
  const { rentGroup, year } = params
  return requestCall('/report/balance', {
    rentGroup: rentGroup,
    year: Number(year),
    // reportDate: reportDate ? format(reportDate, date_format) : null,
  })
} // getReportBalance

const getReportHousingBenefitAcademy = async () => {
  return requestCall('/report/housingbenefit/academy')
} // getReportHousingBenefitAcademy

const postReportHousingBenefitAcademy = async params => {
  const { year } = params
  return sendCall('/report/housingbenefit/academy', {
    year: Number(year),
  })
} // getReportHousingBenefitAcademy

export {
  getOperatingBalances,
  getBatchLog,
  getTenancySummary,
  getTenancy,
  getTenancyTransactions,

  getReportCharges,
  postReportCharges,

  getReportCashImport,
  postReportCashImport,

  getReportCashSuspense,
  postReportCashSuspense,

  getReportBalance,
  postReportBalance,

  getReportHousingBenefitAcademy,
  postReportHousingBenefitAcademy,
}