import { useState } from 'react';
import './App.css';
import Keterangan from './components/Keterangan';
import {gql, useLazyQuery, useMutation} from '@apollo/client';
import LoadingSvg from './components/LoadingSvg';

  const GetKeteranganlist = gql`
  query MyQuery {
    keteranganlist {
      Status
      id
      Pelajaran
    }
  }
  `;

  const GetKeteranganlistByUserid = gql `
  query MyQuery($user_id: Int!) {
    keteranganlist (where: {user_id: {_eq: $user_id}}){
      Status
      id
      Pelajaran
    }
  }
  `;

  const UpdateKeterangan = gql `
  mutation MyMutation($id: Int!, $Status: Boolean) {
    update_keteranganlist_by_pk(pk_columns: {id: $id}, _set: {Status: $Status}) {
      id
    }
  }
  `;

  const DeleteKeterangan = gql `
  mutation MyMutation($id: Int!) {
    delete_keterangan_by_pk(id: $id) {
      id
    }
  }
  `;

  const InsertKeterangan = gql `
  mutation MyMutation($object: keteranganlist_insert_input!) {
    insert_keteranganlist_one(object: $object){
      id
    }
  }
  `;

  function KeteranganList() {
    const {data, loading, error} = useLazyQuery(GetKeteranganlist);
    const [updateKeterangan, {loading: loadingUpdate}] = useMutation(UpdateKeterangan, {refetchQueries: [GetKeteranganlist]
    });
    const [deleteKeterangan, {loading: loadingDelete}] = useMutation(DeleteKeterangan, {refetchQueries: [GetKeteranganlist]
    });
    const [insertKeterangan, {loading: loadingInsert}] = useMutation(InsertKeterangan, {refetchQueries: [GetKeteranganlist]
    });
    // const [userId, setUserId] = useState(0);
    const [list, setList] = useState([]);
    const [title, setTitle] = useState('');

    if(loading || loadingUpdate || loadingDelete || loadingInsert) {
      <LoadingSvg/>
    }

    if(error) {
      console.log(error)
      return null;
    }
  
    const onChangeTitle = (e) => {
      if (e.target) {
        setTitle(e.target.value);
      }
    };
  
    const onSubmitList = (e) => {
      e.preventDefault();
      insertKeterangan({variables: {
        object: {
          title: title,
          user_id: 1,
        }
      },})
      setTitle('')
    };
  
    const onClickItem = (idx) => {
        const item = data?.todolist.find((v) => v.id === idx);
        updateKeterangan({
          variables: {
          id: idx,
          Status: !item.Status,
        },
      });
      // refetch();
    };
  
    const onDeleteItem = (idx) => {
      deleteKeterangan({variables: {
        id: idx
      }})
    };

    // const onGetData = () => {
    //   getKeterangan({
    //     variables: {
    //       user_id: userId,
    //     },
    //   })
    //   setList(data?.keteranganlist);
    // };

    // const onChangeUserid = (e) => {
    //   if (e.target) {
    //     setUserId(e.target.value);
    //   }
    // };

    return (
      <>
        <div className='container'>
          {/* <input value={userId} onChange={onChangeUserid}/>
          <button onClick={onGetData}>Get Data</button> */}
          <h1 className='app-title'>Keterangan</h1>
            <ul className='keterangan-list js-keterangan-list'>
              {data?.keteranganlist.map((v, i) => (
                <Keterangan
                key={v.id}
                id={v.id}
                onClickItem={() => onClickItem(v.id)}
                onDeleteItem={() => onDeleteItem(v.id)}
                title= {v.title}
                checked={v.Status}
                />
              ))}
            </ul>
            <div className='empty-state'>
              <svg>
                <use href='#checklist-icon'></use>
              </svg>
              <h2 className='empty-state__title'>Add your first Keterangan</h2>
              <p className='empty-state__description'>
                What do you want to get done today
              </p>
            </div>
            <form className='js-form' onSubmit={onSubmitList}>
              <input onChange={onChangeTitle} 
                value={title}
                autoFocus
                type='text'
                aria-label='Enter a new keterangan item'
                placeholder='E.g. Build a web app'
                className='js-todo-input'
              />
            </form>
        </div>
      </>
    );
  };

export default KeteranganList;
