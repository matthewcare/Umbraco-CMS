﻿using System;
using System.Data.Common;
using Umbraco.Core.Persistence.SqlSyntax;

namespace Umbraco.Core.Persistence
{
    public class SqlServerDbProviderFactoryCreator : IDbProviderFactoryCreator
    {
        private readonly string _defaultProviderName;
        private readonly Func<string, DbProviderFactory> _getFactory;

        public SqlServerDbProviderFactoryCreator(string defaultProviderName, Func<string, DbProviderFactory> getFactory)
        {
            _defaultProviderName = defaultProviderName;
            _getFactory = getFactory;
        }

        public DbProviderFactory CreateFactory() => CreateFactory(_defaultProviderName);

        public DbProviderFactory CreateFactory(string providerName)
        {
            if (string.IsNullOrEmpty(providerName)) return null;
            return _getFactory(providerName);
        }

        // gets the sql syntax provider that corresponds, from attribute
        public ISqlSyntaxProvider GetSqlSyntaxProvider(string providerName)
        {
            return providerName switch
            {
                Constants.DbProviderNames.SqlCe => throw new NotSupportedException("SqlCe is not supported"),
                Constants.DbProviderNames.SqlServer => new SqlServerSyntaxProvider(),
                _ => throw new InvalidOperationException($"Unknown provider name \"{providerName}\""),
            };
        }

        public IBulkSqlInsertProvider CreateBulkSqlInsertProvider(string providerName)
        {
            switch (providerName)
            {
                case Constants.DbProviderNames.SqlCe:
                    throw new NotSupportedException("SqlCe is not supported");
                case Constants.DbProviderNames.SqlServer:
                    return new SqlServerBulkSqlInsertProvider();
                default:
                    return new BasicBulkSqlInsertProvider();
            }
        }

        public void CreateDatabase()
        {
            throw new NotSupportedException("Embedded databases are not supported");
        }
    }
}
