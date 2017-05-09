<?php
use PHPUnit\Framework\TestCase;

class ValidatorEqualTest extends TestCase
{
    public function testEquality()
    {

		$validator = new \ioValidate\Validator\equal( array( 'value' => 'value2' ) );
		// Empty -- no need to pass values in for this type of validator
		$values = (new \ioValidate\Values())->FromArray( array( 'value2' => '1' ) );

		// Fine
		$this->assertTrue( $validator->Validate( '1', $values ) );

		// Nope
		$this->assertFalse( $validator->Validate( '2', $values ) );
    }
}
?>
