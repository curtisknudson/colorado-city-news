import React from "react";
import { Layout } from "@components/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { Article as ArticleType } from "types/article";
import Article from "@components/article";
import { connectToDatabase } from "@database/mongodb";
import { User } from "types/user";
import dynamic from "next/dynamic";

const DynamicComments = dynamic(() => import("../../components/comments"), {
  ssr: false,
});

interface DatabaseArticle extends ArticleType {
  _id?: string;
}

export interface DynamicArticleProps {
  article: ArticleType;
  author: {
    name: string;
    image: string;
    profileUrl: string;
  };
}

const DynamicArticle = ({ author, article }: DynamicArticleProps) => {
  return (
    <Layout className="mx-0">
      {article && (
        <>
          <Article article={article} author={author} />
          <DynamicComments article={article} />
        </>
      )}
    </Layout>
  );
};

export default DynamicArticle;

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await connectToDatabase();

  const articles = await db.collection("articles").find().toArray();

  const url = articles.map((article: ArticleType) => ({
    params: { id: article.url },
  }));

  const paths = url;

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { db } = await connectToDatabase();
  const articleQuery = { url: params?.id };

  const article: DatabaseArticle = await db
    .collection("articles")
    .findOne(articleQuery);

  const authorQuery = { userId: article.authorId };
  const authorOptions = {
    projection: {
      _id: 0,
      name: 1,
      image: 1,
      profileUrl: 1,
    },
  };

  delete article._id;

  const author: User = await db
    .collection("users")
    .findOne(authorQuery, authorOptions);

  // Pass post data to the page via props
  return { props: { article, author } };
};
