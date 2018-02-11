import uuid

import boto3
from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

import conf


session = boto3.session.Session()
awsauth = AWS4Auth(
        conf.KEY,
        conf.SECRET,
        conf.REGION,
        'es'
        )
es = Elasticsearch(
        hosts=[{'host': conf.HOST, 'port':443}],
        http_auth=awsauth,
        use_ssl=True,
        verify_certs=True,
        connection_class=RequestsHttpConnection,
        )

def post_to_es(body, id):
    _type = conf.TYPE
    _index = conf.INDEX
    es.index(index=_index, doc_type=_type, id=id, body=body)

def get_from_es():
    index = conf.INDEX
    _type = conf.TYPE
    res = es.search(
            index=index,
            doc_type=_type,
            body={"query": {"match_all": {}}},
            )
    return res['hits']['hits']

def delete_all():
    return es.delete_by_query(index='_all', body='')

