import React from 'react';

const AppError: React.FC<{ error?: object }> = ({error}) => {
  if (null == error) {
    error = new Error('null error occured');
  }

  if (error instanceof Error) {
    return (
      <>
        <h1>{error.name}</h1>
        <p>{error.message}</p>
      </>
    );
  }

  if ('object' === typeof error && error.hasOwnProperty('toString')) {
    return <AppError error={new Error(error.toString())}/>;
  }

  if ('string' === typeof error) {
    error = new Error(error);
  } else {
    error = new Error('Unknown error');
  }

  return <AppError error={error}/>;
};

export default AppError;
