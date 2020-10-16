import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters, AiOutlinePlus, AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FiLink } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { BiGitRepoForked } from 'react-icons/bi';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Project imports

import api from '../../services/api';
import { colors } from '../../styles/theme';
import {
  Container,
  Content,
  LogoContent,
  LoadingWrapper,
  InfoContent,
  InfoWrapper,
  Form,
  Input,
  Button,
  ReposContent,
  RepoContent,
  Circle,
  RepoInfoContent,
  StyledArrowBack,
  PaginateButton
} from './styles';
import { H1 as Title, H3 as OrgDescription, H4 as RepoTitle, Span } from '../../styles/fonts';


function Repository({ match, history }) {
  const [loading, setLoading] = useState(true);
  const [organizationData, setOrganizationData] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [listOfLanguages, setListOfLanguages] = useState([]);
  const [hidePaginateButton, setHidePaginateButton] = useState(false);

  // Page manager
  const [page, setPage] = useState(1);
  const [endPaginate, setEndPaginate] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const repoName = match.params.repository;

  const loadRepoData = useCallback(
    async () => {
      const [org, repos] = await Promise.all([
        api.get(`orgs/${repoName}`),
        api.get(`orgs/${repoName}/repos`, {
          params: {
            direction: 'asc',
            per_page: 5,
          }
        }),
      ]);
      console.log({ org, repos })
      setRepositories(repos.data);
      setOrganizationData(org.data);
      setHidePaginateButton(false); // Make sure that everything would be fine
      setLoading(false);
    },
    [repoName]
  );

  useEffect(() => {
    (async function loadData() {
      await loadRepoData();
    })();
  }, [loadRepoData]);

  const validationSchema = Yup.object({
    // We could use required over here but since as an user experience
    // we don't want the border to go red everythng he deletes text so
    // we may just check if is a string
    repoName: Yup.string()
  })

  const randomColors = [
    'red',
    'green',
    'yellow',
    'blue'
  ]

  const getRandomColor = (language) => {

    const checkIfLanguageAlreadyExists = listOfLanguages.filter(
      lang => lang.language === language
    )

    if (checkIfLanguageAlreadyExists.length > 0) {
      return checkIfLanguageAlreadyExists[0].color
    }

    const getRandomValue = randomColors[
      Math.floor(Math.random() * randomColors.length)
    ];

    setListOfLanguages(langs => [...langs, {
      language,
      color: colors[getRandomValue]
    }]);

    return colors[getRandomValue]
  }

  const handlePaginate = async () => {
    try {
      setIsLoadingMore(true);
      const { data } = await api.get(`orgs/${repoName}/repos`, {
        params: {
          direction: 'asc',
          per_page: 5,
          page: page + 1
        }
      });

      if (data.length === 0) {
        return setEndPaginate(true);
      }

      setPage(count => count + 1)
      setRepositories(repos => [...repos, ...data])
      setIsLoadingMore(false);
    } catch (err) {

    }
  }

  const onSearch = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    try {
        const { data: response } = await api.get(`/repos/${repoName}/${values.repoName}`);
        setRepositories([{
         name: response.name,
         description: response.description,
         repoURL: response.login,
         URL: response.avatar_url,
        }])
        setPage(1);
        setEndPaginate(false);
        setHidePaginateButton(true);
    } catch (err) {
      if(err.response.status === 404) {
        setFieldError('repoName', 'Não foi possível encontrar esse repositório')
      } else {
        setFieldError('repoName', err.message)
      }
    }

    setSubmitting(false);
  }

  return (
    <Container>
      <Link to="/">
        <StyledArrowBack />
      </Link>

      <Content>
        {loading ? (
          <LoadingWrapper>
            <AiOutlineLoading3Quarters size="160px" color={colors.green} />
          </LoadingWrapper>
        ) : (
          <>
          <LogoContent>
            <img src={organizationData.avatar_url} alt={`${organizationData.name} avatar`} />
            <Title>{organizationData.name}</Title>
            <OrgDescription color={colors.gray}>
              {organizationData.description}
            </OrgDescription>
            <InfoContent>
              {organizationData.location && (
                <InfoWrapper>
                  <GrLocation color={colors.grayLight} />
                  <OrgDescription color={colors.gray}>
                    {organizationData.location}
                  </OrgDescription>
                </InfoWrapper>
              )}

              {organizationData.blog && (
                <InfoWrapper>
                  <FiLink color={colors.gray} />
                  <OrgDescription color={colors.gray}>
                    {organizationData.blog}
                  </OrgDescription>
                </InfoWrapper>
              )}
            </InfoContent>
          </LogoContent>
          <Formik
            initialValues={{ repoName: '' }}
            validate={ async ({ repoName }) => {
              // Now we know that this will only occur
              // when user searched and successfully found
              // an existing repository
              if (repoName === '' && hidePaginateButton) {
                await loadRepoData();
              }
            }}
            validationSchema={validationSchema}
            onSubmit={onSearch}
          >
            {
            ({
              handleSubmit,
              values,
              isSubmitting,
              handleChange,
              errors
            }) => (
              <Form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="repoName"
                  placeholder="Buscar repositórios"
                  isError={errors.repoName}
                  onChange={handleChange}
                  value={values.repoName}
                />
                <Button
                  type="submit"
                  disabled={values.repoName === '' || isSubmitting}
                  isError={errors.repoName}
                  >
                  <AiOutlinePlus size="25px" color={colors.white} />
                </Button>
              </Form>
            )}
          </Formik>
          </>
        )}
      <ReposContent>
        {repositories.map(repo => (
          <RepoContent key={repo.id}>
            <RepoTitle>{repo.name}</RepoTitle>
            <Span>{repo.description}</Span>
            <RepoInfoContent>
              {repo.language && (
                <InfoWrapper>
                  <Circle color={getRandomColor(repo.language)} />
                  <Span isBold>{repo.language}</Span>
                </InfoWrapper>
              )}
              <InfoWrapper>
                <BiGitRepoForked />
                <Span isBold>{repo.forks}</Span>
              </InfoWrapper>
              <InfoWrapper>
                <AiFillStar color={colors.yellow}/>
                <Span isBold>{repo.stargazers_count}</Span>
              </InfoWrapper>
            </RepoInfoContent>
          </RepoContent>
        ))}
      </ReposContent>
      {!hidePaginateButton && (
        <>
          {endPaginate ? (
            <OrgDescription color={colors.gray}>
              Não foi possível encontrar mais repositórios
            </OrgDescription>
          ) : (
            <PaginateButton
              type="button"
              onClick={() => handlePaginate()}
              >
                {isLoadingMore ? (
                  <AiOutlineLoading3Quarters size="30px" color={colors.white} />
                ) : 'Carregar'}
              </PaginateButton>
          )}
        </>
      )}

      </Content>
    </Container>
  )
}

export default Repository