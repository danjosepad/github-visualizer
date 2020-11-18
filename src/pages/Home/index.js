import React, { useState } from 'react';
import { AiOutlineGithub, AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import Lottie from 'react-lottie';

// Project imports

import {
  Container,
  Content,
  LogoContent,
  Form,
  Input,
  Button,
  RepositoriesWrapper,
  RepositoryContainer,
  FormWrapper,
  StyledErrorMessage,
  DeleteOrganizationButton,
  EmptyRepositoryText,
  EmptyRepositoryWrapper,
} from './styles';
import { H1 as Title, H4 as OrgName, Span } from '../../styles/fonts';
import { colors } from '../../styles/theme';
import api from '../../services/api';
import EmptyBox from '../../assets/empty-box.json';

function Home() {
  const [repositories, setRepositories] = useState(
    JSON.parse(localStorage.getItem('@Github:orgs')) || []
  );

  const onAdd = async (
    values,
    {
      setSubmitting,
      setFieldError,
      setFieldValue,
    }
  ) => {
    setSubmitting(true);
    try {
      const IsValueDuplicated = repositories
        .some(
          repo => repo.name === values.orgName
          || repo.repoURL === values.orgName.toLowerCase()
        );

      if (!IsValueDuplicated) {
        const { data: response } = await api.get(`/orgs/${values.orgName}`);
        const reposUpdated = [...repositories, {
          name: response.name,
          description: response.description,
          repoURL: response.login,
          URL: response.avatar_url,
        }];
        setRepositories(reposUpdated);
        localStorage.setItem('@Github:orgs', JSON.stringify(reposUpdated));
      }
      setFieldValue('orgName', '');
    } catch (err) {
      if (err.response.status === 404) {
        setFieldError('orgName', 'Não foi possível encontrar essa organização');
      } else {
        setFieldError('orgName', err.message);
      }
    }

    setSubmitting(false);

    // console.log(response)
  };
  const deleteRepo = (idx, event) => {
    // Making sure only to click on button instead of div and button
    event.preventDefault();

    const repositoriesMirror = [...repositories];
    repositoriesMirror.splice(idx, 1);
    setRepositories(repositoriesMirror);
    localStorage.setItem('@Github:orgs', JSON.stringify(repositoriesMirror));
  };

  const validationSchema = Yup.object({
    // We could use required over here but since as an user experience
    // we don't want the border to go red everythng he deletes text so
    // we may just check if is a string
    orgName: Yup.string(),
  });

  // We can use JSON as gif using Lottie so we have more performance
  const LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: EmptyBox,
  };

  return (
    <Container>
      <Helmet>
        <title>Github Visualizer</title>
      </Helmet>
      <Content>

        <LogoContent data-testid="#logoContent">
          <AiOutlineGithub size="160px" />
          <Title>Github Visualizer</Title>
          <Formik
            initialValues={{ orgName: '' }}
            validationSchema={validationSchema}
            onSubmit={onAdd}
          >
            {
            ({
              handleSubmit,
              values,
              isSubmitting,
              handleChange,
              errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormWrapper isSubmitting={isSubmitting}>
                  <Input
                    type="text"
                    data-testid="#orgNameInput"
                    name="orgName"
                    placeholder="Adicionar organização"
                    isError={errors.orgName}
                    onChange={handleChange}
                    value={values.orgName}
                  />
                  <Button
                    type="submit"
                    disabled={values.orgName === '' || isSubmitting}
                    isError={errors.orgName}
                  >
                    {isSubmitting ? (
                      <AiOutlineLoading3Quarters size="25px" color={colors.white} />
                    ) : (
                      <AiOutlinePlus size="25px" color={colors.white} />
                    )}
                  </Button>
                </FormWrapper>
                <ErrorMessage id="orgName" name="orgName" component={StyledErrorMessage} />
              </Form>
            )
}
          </Formik>
        </LogoContent>
        <RepositoriesWrapper>
          {repositories[0] ? (
            repositories.map((repo, idx) => (
              <RepositoryContainer
                key={`${repo} ${idx}`}
                to={`/${repo.repoURL}`}
                data-testid="#organizationContent"
              >
                <DeleteOrganizationButton
                  aria-label="delete repo"
                  onClick={(e) => {
                    deleteRepo(idx, e);
                  }}
                >
                  <BsTrash size="20px" color={colors.white} />
                </DeleteOrganizationButton>
                <img src={repo.URL} alt={repo.name} />
                <OrgName aria-label="repo name">{repo.name}</OrgName>
                <Span>{repo.description}</Span>
              </RepositoryContainer>
            ))
          ) : (
            <EmptyRepositoryWrapper>
              <Lottie
                options={LottieOptions}
                height={300}
                width={300}
              />
              <EmptyRepositoryText>
                Adicione uma organização para começar
              </EmptyRepositoryText>
            </EmptyRepositoryWrapper>
          )}
        </RepositoriesWrapper>
      </Content>
    </Container>
  );
}

export default Home;
