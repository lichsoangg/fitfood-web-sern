import { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../../../../components/Pagination';
import { useGetMeQuery } from '../../../../features/account/accountApi';
import { selectCurrentAuth } from '../../../../features/authentication/authSlice';
import { useGetEmployeesQuery } from '../../../../features/employees/employeesApi';
import useQueryParams from '../../../../hooks/useQueryParams';
import './AdminHomepage.scss';

const initialQuery = {
  limit: 1,
  page: 1
};
export default function AdminHomepage() {
  let queryConfig = useQueryParams();
  if (Object.keys(queryConfig).length === 0) {
    queryConfig = { ...initialQuery };
  }
  const { data: user } = useGetMeQuery(undefined);

  const { data: employees, isLoading: isGetEmployeeLoading } = useGetEmployeesQuery(queryConfig, { skip: !user });
  return (
    <>
      {employees?.data &&
        employees?.data?.map((employee, index) => {
          return <span key={index}>{employee.Username}</span>;
        })}
      <Pagination queryConfig={queryConfig} pageSize={employees?.pageSize} />
    </>
  );
}
