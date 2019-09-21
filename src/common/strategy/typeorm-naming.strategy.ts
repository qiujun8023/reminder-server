import * as _ from 'lodash';
import { NamingStrategyInterface, DefaultNamingStrategy } from 'typeorm';

export class TypeOrmNamingStrategy  extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : _.snakeCase(targetName);
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return _.snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join('_'));
  }

  relationName(propertyName: string): string {
    return _.snakeCase(propertyName);
  }
}
