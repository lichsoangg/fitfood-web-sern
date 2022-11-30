import './EmployeeManagement.scss';
import useQueryParams from '../../../../hooks/useQueryParams';
import { useGetMeQuery } from '../../../../features/account/accountApi';
import Pagination from '../../../../components/Pagination/Pagination';
import { useLocation } from 'react-router-dom';
import { useGetEmployeesQuery } from '../../../../features/employees/employeesApi';
const initialQuery = {
  limit: 10,
  page: 1
};
export default function EmployeeManagement() {
  const location = useLocation();
  let queryConfig = useQueryParams();
  if (Object.keys(queryConfig).length === 0) {
    queryConfig = { ...initialQuery };
  }
  const { data: user } = useGetMeQuery(undefined);

  const { data: employees, isLoading: isGetEmployeeLoading } = useGetEmployeesQuery(queryConfig, { skip: !user });
  return (
    <>
      <div className='divemployees'>
        {employees?.data &&
          employees?.data?.map((employee, index) => {
            return <span key={index}>{employee.Username}</span>;
          })}
      </div>

      <Pagination queryConfig={queryConfig} pageSize={employees?.pageSize} pathname={location?.pathname} />
    </>
  );
}
