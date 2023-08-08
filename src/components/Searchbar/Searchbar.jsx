import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Header,
  SearchButton,
  SearchButtonLabel,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

const initialValues = {
  query: '',
};

const schema = yup.object().shape({
  query: yup.string(),
});

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    const query = values.query.trim().toLowerCase();
    onSubmit(query);
    resetForm();
  };

  return (
    <Header>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <SearchForm>
          <SearchButton type="submit">
            <FaSearch />
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchInput
            name="query"
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Header>
  );
};

export default Searchbar;

// import { Component } from 'react';
// import {
//   Header,
//   SearchButton,
//   SearchButtonLabel,
//   SearchForm,
//   SearchInput,
// } from './Searchbar.styled';
// import { FaSearch } from 'react-icons/fa';
// // ({ onSubmit })

// const ERR_MSG = 'Please, enter a correct query.';

// class Searchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleChange = e => {
//     this.setState({
//       query: e.target.value,
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     const { query } = this.state;
//     const normalizedQuery = query.trim();

//     const containsInvalidCharacters = /[&?!@#$^*()_=+№;:'"%]/.test(
//       normalizedQuery
//     );

//     if (normalizedQuery === '' || containsInvalidCharacters) {
//       this.props.onSubmit('', ERR_MSG);
//     } else {
//       this.props.onSubmit(normalizedQuery, null);
//     }

//     // if (normalizedQuery === '' || containsInvalidCharacters) {
//     //   this.setState({
//     //     error: 'Please, enter a correct query.',
//     //     data: [],
//     //   });
//     // } else {
//     //   this.setState({
//     //     query: normalizedQuery,
//     //     error: null,
//     //   });
//     // }

//     this.setState({
//       query: '',
//     });
//   };

//   render() {
//     return (
//       <Header>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchButton type="submit">
//             <FaSearch />
//             <SearchButtonLabel>Search</SearchButtonLabel>
//           </SearchButton>

//           <SearchInput
//             name="query"
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//             value={this.state.query}
//           />
//         </SearchForm>
//       </Header>
//     );
//   }
// }

// export default Searchbar;
