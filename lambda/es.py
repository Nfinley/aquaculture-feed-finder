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

def post_to_es(doc):
    _index = str(uuid.uuid4())
    _type = 'feeds'
    es.index(index=_index, doc_type=_type, body=doc)

def get_from_es():
    return es.info()

